import React, { useEffect, useState } from 'react';

interface BrowserInfo {
  name: string;
  version: string;
  engine: string;
  platform: string;
  mobile: boolean;
  pixelRatio: number;
  viewport: {
    width: number;
    height: number;
  };
  features: {
    flexGap: boolean;
    cssGrid: boolean;
    customProperties: boolean;
    intersectionObserver: boolean;
    webp: boolean;
  };
}

const BrowserCompatibilityChecker: React.FC = () => {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    const detectBrowser = (): BrowserInfo => {
      const ua = navigator.userAgent;
      const vendor = navigator.vendor || '';
      
      let name = 'Unknown';
      let version = 'Unknown';
      let engine = 'Unknown';
      
      // Detect browser
      if (/Chrome/.test(ua) && /Google Inc/.test(vendor)) {
        name = 'Chrome';
        version = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
        engine = 'Blink';
      } else if (/Safari/.test(ua) && /Apple/.test(vendor)) {
        name = 'Safari';
        version = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
        engine = 'WebKit';
      } else if (/Firefox/.test(ua)) {
        name = 'Firefox';
        version = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
        engine = 'Gecko';
      } else if (/Edg/.test(ua)) {
        name = 'Edge';
        version = ua.match(/Edg\/(\d+)/)?.[1] || 'Unknown';
        engine = 'Blink';
      }

      // Feature detection
      const features = {
        flexGap: CSS.supports('gap', '1rem'),
        cssGrid: CSS.supports('display', 'grid'),
        customProperties: CSS.supports('color', 'var(--test)'),
        intersectionObserver: 'IntersectionObserver' in window,
        webp: (() => {
          const canvas = document.createElement('canvas');
          return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        })()
      };

      return {
        name,
        version,
        engine,
        platform: navigator.platform,
        mobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
        pixelRatio: window.devicePixelRatio || 1,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        features
      };
    };

    const info = detectBrowser();
    setBrowserInfo(info);

    // Check for compatibility issues
    const newWarnings: string[] = [];
    
    if (info.name === 'Chrome' && parseInt(info.version) < 58) {
      newWarnings.push('Chrome version is outdated. Some features may not work correctly.');
    }
    
    if (info.name === 'Firefox' && parseInt(info.version) < 57) {
      newWarnings.push('Firefox version is outdated. Some features may not work correctly.');
    }
    
    if (info.name === 'Safari' && parseInt(info.version) < 11) {
      newWarnings.push('Safari version is outdated. Some features may not work correctly.');
    }
    
    if (info.name === 'Edge' && parseInt(info.version) < 16) {
      newWarnings.push('Edge version is outdated. Some features may not work correctly.');
    }

    if (!info.features.flexGap) {
      newWarnings.push('CSS Gap property not supported. Using fallback spacing.');
    }

    if (!info.features.customProperties) {
      newWarnings.push('CSS Custom Properties not supported. Using fallback values.');
    }

    if (info.pixelRatio > 2) {
      newWarnings.push('High DPI display detected. Ensure images are optimized.');
    }

    setWarnings(newWarnings);

    // Apply browser-specific classes
    document.documentElement.className += ` browser-${info.name.toLowerCase()}`;
    document.documentElement.className += ` engine-${info.engine.toLowerCase()}`;
    
    if (info.mobile) {
      document.documentElement.className += ' mobile';
    }

    if (info.pixelRatio > 1) {
      document.documentElement.className += ' retina';
    }

  }, []);

  if (!browserInfo) {
    return null;
  }

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm text-xs z-50">
      <h3 className="font-semibold mb-2">Browser Info</h3>
      <div className="space-y-1 text-gray-600">
        <div><strong>Browser:</strong> {browserInfo.name} {browserInfo.version}</div>
        <div><strong>Engine:</strong> {browserInfo.engine}</div>
        <div><strong>Platform:</strong> {browserInfo.platform}</div>
        <div><strong>Viewport:</strong> {browserInfo.viewport.width}×{browserInfo.viewport.height}</div>
        <div><strong>Pixel Ratio:</strong> {browserInfo.pixelRatio}</div>
        <div><strong>Mobile:</strong> {browserInfo.mobile ? 'Yes' : 'No'}</div>
      </div>
      
      <h4 className="font-semibold mt-3 mb-1">Feature Support</h4>
      <div className="space-y-1 text-xs">
        {Object.entries(browserInfo.features).map(([feature, supported]) => (
          <div key={feature} className="flex justify-between">
            <span>{feature}:</span>
            <span className={supported ? 'text-green-600' : 'text-red-600'}>
              {supported ? '✓' : '✗'}
            </span>
          </div>
        ))}
      </div>

      {warnings.length > 0 && (
        <>
          <h4 className="font-semibold mt-3 mb-1 text-orange-600">Warnings</h4>
          <div className="space-y-1">
            {warnings.map((warning, index) => (
              <div key={index} className="text-orange-600 text-xs">
                ⚠ {warning}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BrowserCompatibilityChecker;
