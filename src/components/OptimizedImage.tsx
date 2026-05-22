'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/src/lib/utils';

export interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
  shimmer?: boolean;
}

export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ src, alt, className, fallbackSrc = "/dalogo.webp", shimmer = true, fill, width, height, priority, ...props }, ref) => {
    const [prevSrc, setPrevSrc] = useState<string>(src);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Sync state if src prop changes during render
    if (src !== prevSrc) {
      setPrevSrc(src);
      setLoading(true);
      setError(false);
    }

    // Dynamic Tailwind skeleton pulse logic
    const pulseClass = shimmer && loading
      ? 'animate-pulse bg-foreground/10'
      : '';

    // Handle dimensions
    // If fill is true, do not pass width or height to next/image
    const imageDimensions = fill ? {} : { width: width || 800, height: height || 600 };

    return (
      <div 
        className={cn(
          "overflow-hidden relative select-none w-full h-full", 
          pulseClass, 
          className
        )}
      >
        <Image
          ref={ref}
          src={error ? fallbackSrc : src}
          alt={alt || 'Digital Addis Asset'}
          fill={fill}
          {...imageDimensions}
          priority={priority}
          className={cn(
            "object-cover transition-all duration-700 ease-in-out w-full h-full",
            loading ? "scale-[1.02] blur-sm opacity-50" : "scale-100 blur-0 opacity-100"
          )}
          onLoadingComplete={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          {...props}
        />
      </div>
    );
  }
);

OptimizedImage.displayName = 'OptimizedImage';
