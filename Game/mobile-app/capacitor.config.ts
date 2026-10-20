import type { CapacitorConfig } from '@capacitor/cli';

// Approved LOCAL DEBUG identity. Production ID/signing require a separate decision.
const config: CapacitorConfig = {
  appId: 'dev.littleroutes.slice',
  appName: 'Little Routes Dev',
  webDir: 'dist',
  loggingBehavior: 'debug',
  backgroundColor: '#f8f4e9',
  android: { allowMixedContent: false, backgroundColor: '#f8f4e9' },
  plugins: {
    SystemBars: {
      insetsHandling: 'native',
      initialViewportFitValueHint: 'cover',
    },
  },
};
export default config;
