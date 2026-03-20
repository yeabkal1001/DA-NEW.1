import { useEffect, useState } from 'react';

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  prefersReducedMotion: boolean;
  connectionSpeed: 'slow' | 'normal' | 'fast';
  deviceMemory: number | undefined;
  hardwareConcurrency: number | undefined;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    prefersReducedMotion: false,
    connectionSpeed: 'normal',
    deviceMemory: undefined,
    hardwareConcurrency: undefined,
  });

  useEffect(() => {
    // Check if mobile/tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const width = window.innerWidth;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Check device memory and concurrency
    const deviceMemory = (navigator as any).deviceMemory as number | undefined;
    const hardwareConcurrency = navigator.hardwareConcurrency;

    // Check connection speed
    let connectionSpeed: 'slow' | 'normal' | 'fast' = 'normal';
    const connection = (navigator as any).connection;
    if (connection) {
      const effectiveType = connection.effectiveType;
      if (effectiveType === '4g') connectionSpeed = 'fast';
      else if (effectiveType === '3g') connectionSpeed = 'slow';
    }

    setCapabilities({
      isMobile: isMobile || width < 768,
      isTablet,
      isDesktop,
      prefersReducedMotion,
      connectionSpeed,
      deviceMemory,
      hardwareConcurrency,
    });
  }, []);

  return capabilities;
}
