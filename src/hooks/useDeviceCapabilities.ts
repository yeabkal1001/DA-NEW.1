'use client';

import { useEffect, useState } from 'react';

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  connectionSpeed: 'slow' | 'fast';
  deviceMemory: number; // in GB, fallback to 4
  cpuCores: number; // fallback to 4
  isLowEnd: boolean;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [caps, setCaps] = useState<DeviceCapabilities>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    connectionSpeed: 'fast',
    deviceMemory: 8,
    cpuCores: 8,
    isLowEnd: false,
  });

  useEffect(() => {
    const checkCapabilities = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;

      // Access Navigator APIs safely
      interface ExtendedNavigator extends Navigator {
        deviceMemory?: number;
        connection?: {
          effectiveType?: string;
        };
      }
      const nav = typeof navigator !== 'undefined' ? (navigator as ExtendedNavigator) : null;
      
      // Connection speed: slow if effectiveType is 'slow-2g', '2g', or '3g'
      let connectionSpeed: 'slow' | 'fast' = 'fast';
      if (nav && nav.connection && nav.connection.effectiveType) {
        const type = nav.connection.effectiveType;
        if (type === 'slow-2g' || type === '2g' || type === '3g') {
          connectionSpeed = 'slow';
        }
      }

      // Memory and CPU cores
      const deviceMemory = nav ? (nav.deviceMemory || 4) : 4;
      const cpuCores = nav ? (nav.hardwareConcurrency || 4) : 4;

      // Low end if memory < 4GB or cores < 4 or connection is slow
      const isLowEnd = deviceMemory < 4 || cpuCores < 4 || connectionSpeed === 'slow';

      setCaps({
        isMobile,
        isTablet,
        isDesktop,
        connectionSpeed,
        deviceMemory,
        cpuCores,
        isLowEnd,
      });
    };

    checkCapabilities();

    window.addEventListener('resize', checkCapabilities);
    return () => window.removeEventListener('resize', checkCapabilities);
  }, []);

  return caps;
}
