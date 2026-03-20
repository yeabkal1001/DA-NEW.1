'use client';

import { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  className?: string;
  wrapperClassName?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down';
  sizes?: string;
  quality?: number;
}

const OptimizedImageComponent = memo(function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  fill = false,
  priority = false,
  loading = 'lazy',
  className = '',
  wrapperClassName = '',
  objectFit = 'cover',
  sizes,
  quality = 75,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
  }, []);

  // Use regular img for external URLs, Next.js Image for internal
  const isExternal = src.startsWith('http');

  if (isExternal) {
    return (
      <div className={cn('relative overflow-hidden', wrapperClassName)}>
        <img
          src={hasError ? '/placeholder.svg' : src}
          alt={alt}
          className={cn(
            'transition-all duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          fetchPriority={priority ? 'high' : 'auto'}
        />
        {/* Loading placeholder */}
        {!isLoaded && (
          <div 
            className="absolute inset-0 bg-gray-100 animate-pulse"
            aria-hidden="true"
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      <Image
        src={hasError ? '/placeholder.svg' : src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        loading={priority ? undefined : loading}
        className={cn(
          'transition-all duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        style={{ objectFit }}
        quality={quality}
        sizes={sizes || (fill ? '100vw' : undefined)}
        onLoad={handleLoad}
        onError={handleError}
      />
      {/* Loading placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
});

export default OptimizedImageComponent;
