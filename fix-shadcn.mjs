import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('C:\\Users\\yeabs\\Documents\\da-with-nextjs\\src\\components\\ui', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/size-\(--cell-size\)/g, 'h-[var(--cell-size)] w-[var(--cell-size)]');
    content = content.replace(/h-\(--cell-size\)/g, 'h-[var(--cell-size)]');
    content = content.replace(/w-\(--cell-size\)/g, 'w-[var(--cell-size)]');
    content = content.replace(/min-w-\(--cell-size\)/g, 'min-w-[var(--cell-size)]');
    content = content.replace(/px-\(--cell-size\)/g, 'px-[var(--cell-size)]');
    content = content.replace(/\[--cell-size:--spacing\(8\)\]/g, '[--cell-size:2rem]');

    content = content.replace(/w-\(--sidebar(?:-([a-zA-Z0-9-]+))?\)/g, 'w-[var(--sidebar$1)]');
    content = content.replace(/max-w-\(--([a-zA-Z0-9-]+)\)/g, 'max-w-[var(--$1)]');
    content = content.replace(/max-h-\(--([a-zA-Z0-9-]+)\)/g, 'max-h-[var(--$1)]');
    content = content.replace(/origin-\(--([a-zA-Z0-9-]+)\)/g, 'origin-[var(--$1)]');
    content = content.replace(/bg-\(--([a-zA-Z0-9-]+)\)/g, 'bg-[var(--$1)]');
    content = content.replace(/border-\(--([a-zA-Z0-9-]+)\)/g, 'border-[var(--$1)]');
    content = content.replace(/text-\(--([a-zA-Z0-9-]+)\)/g, 'text-[var(--$1)]');

    content = content.replace(/gap-\[--spacing\(var\(--gap\)\)\]/g, 'gap-[var(--gap)]');
    content = content.replace(/calc\(var\(--spacing\)\*4\)/g, '1rem');
    content = content.replace(/--spacing\(4\)/g, '1rem');

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed', filePath);
    }
  }
});
