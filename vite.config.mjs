import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
      "@/shared": path.resolve(process.cwd(), "./src/shared"),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    // Enhanced cache busting and optimization
    rollupOptions: {
      output: {
        // Add hash to filenames for cache busting
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // Generate source maps for better debugging
    sourcemap: process.env.NODE_ENV !== 'production',
    // Optimize chunks
    chunkSizeWarningLimit: 1000,
    target: ['es2015', 'chrome58', 'firefox57', 'safari11', 'edge16']
  },
  server: {
    // Development server configuration
    host: true,
    port: 5173,
    strictPort: false,
    hmr: {
      overlay: true
    }
  },
  // Define global constants for cross-browser compatibility
  define: {
    __DEV__: process.env.NODE_ENV === 'development',
    __PROD__: process.env.NODE_ENV === 'production'
  }
})