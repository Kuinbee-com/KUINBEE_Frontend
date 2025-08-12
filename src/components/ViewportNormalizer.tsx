import React, { useEffect } from 'react';

/**
 * ViewportNormalizer Component
 * 
 * Ensures consistent viewport rendering across different browsers and operating systems
 * by normalizing zoom levels, DPI scaling, and browser rendering differences.
 */
const ViewportNormalizer: React.FC = () => {
  useEffect(() => {
    const normalizeViewport = () => {
      // Get current browser zoom level
      const getZoomLevel = () => {
        const screen = window.screen;
        const zoom = Math.round((screen.width / window.innerWidth) * 100) / 100;
        return zoom;
      };

      // Get device pixel ratio
      const pixelRatio = window.devicePixelRatio || 1;
      
      // Detect if user is on Windows with scaling
      const isWindows = navigator.platform.indexOf('Win') > -1;
      const userAgent = navigator.userAgent;
      
      // Add classes to document for CSS targeting
      document.documentElement.classList.add('viewport-normalized');
      
      if (isWindows) {
        document.documentElement.classList.add('os-windows');
      } else if (navigator.platform.indexOf('Linux') > -1) {
        document.documentElement.classList.add('os-linux');
      } else if (navigator.platform.indexOf('Mac') > -1) {
        document.documentElement.classList.add('os-mac');
      }

      // Add pixel ratio classes
      if (pixelRatio > 1) {
        document.documentElement.classList.add('high-dpi');
        document.documentElement.style.setProperty('--pixel-ratio', pixelRatio.toString());
      }

      // Force consistent base font size
      document.documentElement.style.fontSize = '16px';
      
      // Ensure consistent zoom
      if (document.body) {
        document.body.style.zoom = '1';
        document.body.style.transform = 'scale(1)';
        document.body.style.transformOrigin = 'top left';
      }

      // Set consistent viewport meta if not already set
      let viewportMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
      if (!viewportMeta) {
        viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        document.head.appendChild(viewportMeta);
      }
      viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';

      // Log viewport info for debugging (development only)
      if (process.env.NODE_ENV === 'development') {
        console.log('Viewport Normalizer:', {
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          pixelRatio: pixelRatio,
          zoom: getZoomLevel(),
          userAgent: userAgent,
          platform: navigator.platform
        });
      }
    };

    // Run normalization
    normalizeViewport();

    // Re-run on window resize
    const handleResize = () => {
      normalizeViewport();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return null;
};

export default ViewportNormalizer;
