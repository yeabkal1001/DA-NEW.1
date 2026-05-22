import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const WIKI_DIR = path.join(process.cwd(), '.antigravity', 'repowiki', 'en', 'content');

export interface WikiArticle {
  title: string;
  slug: string; // e.g. "getting-started" or "animation-system"
  path: string;
}

export interface WikiCategory {
  name: string;
  slug: string;
  articles: WikiArticle[];
  subcategories: WikiCategory[];
}

export interface WikiArticleData {
  title: string;
  content: string; // HTML string
  rawContent: string;
  toc: { text: string; id: string; level: number }[];
  breadcrumbs: { name: string; link: string }[];
  nextArticle: WikiArticle | null;
  prevArticle: WikiArticle | null;
}

/**
 * Normalizes title string into a readable title
 */
export function formatCategoryName(name: string): string {
  return name
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Recursively scans .antigravity/repowiki/en/content and builds tree structure
 */
export function getWikiStructure(): WikiCategory {
  const rootName = 'Project Documentation';

  const traverse = (
    currentDir: string,
    currentSlug: string = ''
  ): { articles: WikiArticle[]; subcategories: WikiCategory[] } => {
    const articles: WikiArticle[] = [];
    const subcategories: WikiCategory[] = [];

    if (!fs.existsSync(currentDir)) {
      return { articles, subcategories };
    }

    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const dirSlug = currentSlug ? `${currentSlug}/${item}` : item;
        const subResult = traverse(fullPath, dirSlug);

        // Only include if it actually contains articles or nested subdirectories with articles
        if (subResult.articles.length > 0 || subResult.subcategories.length > 0) {
          subcategories.push({
            name: formatCategoryName(item),
            slug: dirSlug.toLowerCase().replace(/\s+/g, '-'),
            articles: subResult.articles,
            subcategories: subResult.subcategories,
          });
        }
      } else if (item.endsWith('.md')) {
        const nameWithoutExt = path.basename(item, '.md');
        const artSlug = currentSlug ? `${currentSlug}/${nameWithoutExt}` : nameWithoutExt;

        // Try extracting first H1 header as title
        let title = formatCategoryName(nameWithoutExt);
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const match = content.match(/^#\s+(.+)$/m);
          if (match && match[1]) {
            title = match[1].trim();
          }
        } catch (e) {
          console.error(`Failed to read title for ${item}:`, e);
        }

        articles.push({
          title,
          slug: artSlug.toLowerCase().replace(/\s+/g, '-'),
          path: fullPath,
        });
      }
    }

    // Sort articles and subcategories alphabetically
    articles.sort((a, b) => a.title.localeCompare(b.title));
    subcategories.sort((a, b) => a.name.localeCompare(b.name));

    return { articles, subcategories };
  };

  const { articles, subcategories } = traverse(WIKI_DIR);

  return {
    name: rootName,
    slug: '',
    articles,
    subcategories,
  };
}

/**
 * Flattens all articles in a tree structure into a 1D array
 */
export function flattenWikiArticles(category: WikiCategory = getWikiStructure()): WikiArticle[] {
  let list: WikiArticle[] = [...category.articles];
  for (const sub of category.subcategories) {
    list = list.concat(flattenWikiArticles(sub));
  }
  return list;
}

/**
 * Case/space/hyphen-insensitive file matcher
 */
export function findFileBySlug(slugParts: string[]): string | null {
  let currentDir = WIKI_DIR;

  for (let i = 0; i < slugParts.length; i++) {
    const part = slugParts[i].toLowerCase().replace(/[-\s]+/g, '');
    if (!fs.existsSync(currentDir)) return null;

    const items = fs.readdirSync(currentDir);
    let matchedItem: string | null = null;

    for (const item of items) {
      const normalizedItem = item.toLowerCase().replace(/[-\s]+/g, '').replace(/\.md$/, '');
      if (normalizedItem === part) {
        matchedItem = item;
        break;
      }
    }

    if (!matchedItem) return null;

    currentDir = path.join(currentDir, matchedItem);

    // If last part, check if file or look inside directory for same-named file
    if (i === slugParts.length - 1) {
      const stat = fs.statSync(currentDir);
      if (stat.isFile() && currentDir.endsWith('.md')) {
        return currentDir;
      } else if (stat.isDirectory()) {
        const subItems = fs.readdirSync(currentDir);
        for (const subItem of subItems) {
          const normSub = subItem.toLowerCase().replace(/[-\s]+/g, '').replace(/\.md$/, '');
          if (normSub === part && subItem.endsWith('.md')) {
            return path.join(currentDir, subItem);
          }
        }
      }
    }
  }

  return null;
}

/**
 * Helper to escape HTML tags in code blocks before marked processes it, if needed,
 * but marked handles block code nicely.
 */
export function parseWikiMarkdown(rawContent: string): {
  content: string;
  toc: { text: string; id: string; level: number }[];
} {
  const toc: { text: string; id: string; level: number }[] = [];

  const renderer = new marked.Renderer();

  // Custom heading renderer to extract Table of Contents and inject anchor IDs
  renderer.heading = function ({ text, depth }) {
    const cleanId = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (depth === 2 || depth === 3) {
      toc.push({ text, id: cleanId, level: depth });
    }

    return `<h${depth} id="${cleanId}" class="anchor-header">${text}</h${depth}>`;
  };

  marked.setOptions({
    renderer,
    gfm: true,
    breaks: true,
  });

  // marked.parse returns string
  const content = marked.parse(rawContent) as string;

  return { content, toc };
}

/**
 * Fetches and parses a single wiki article by slug parts
 */
export function getWikiArticle(slugParts: string[]): WikiArticleData | null {
  const filePath = findFileBySlug(slugParts);
  if (!filePath || !fs.existsSync(filePath)) {
    return null;
  }

  try {
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const { content, toc } = parseWikiMarkdown(rawContent);

    // Extract H1 title or fallback
    let title = 'Documentation';
    const match = rawContent.match(/^#\s+(.+)$/m);
    if (match && match[1]) {
      title = match[1].trim();
    }

    // Build breadcrumbs
    const breadcrumbs = slugParts.map((part, index) => {
      const link = '/wiki/' + slugParts.slice(0, index + 1).join('/');
      const name = part
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return { name, link };
    });

    // Prev & Next article links logic
    const flatArticles = flattenWikiArticles();
    const currentSlugString = slugParts.join('/').toLowerCase();
    
    const currentIndex = flatArticles.findIndex(art => {
      const artNorm = art.slug.replace(/[-\s/]+/g, '');
      const curNorm = currentSlugString.replace(/[-\s/]+/g, '');
      return artNorm === curNorm || curNorm.includes(artNorm) || artNorm.includes(curNorm);
    });

    const prevArticle = currentIndex > 0 ? flatArticles[currentIndex - 1] : null;
    const nextArticle =
      currentIndex >= 0 && currentIndex < flatArticles.length - 1
        ? flatArticles[currentIndex + 1]
        : null;

    return {
      title,
      content,
      rawContent,
      toc,
      breadcrumbs,
      nextArticle,
      prevArticle,
    };
  } catch (e) {
    console.error(`Error loading wiki article for slug ${slugParts.join('/')}:`, e);
    return null;
  }
}
