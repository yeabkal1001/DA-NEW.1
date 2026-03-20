import { memo } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down';
}

const OptimizedImageComponent = memo(function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  priority = false,
  loading = 'lazy',
  className = '',
  objectFit = 'cover',
}: OptimizedImageProps) {
  // Use regular img for external URLs, Image component for internal
  const isExternal = src.startsWith('http');

  if (isExternal) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={loading}
      className={className}
      style={{ objectFit }}
      quality={75}
    />
  );
});

export default OptimizedImageComponent;
