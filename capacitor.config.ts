import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.descarmed.os.app',
  appName: 'DescarmedOS',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // em milissegundos (3s)
      backgroundColor: '#00000000', // cor de fundo no formato ARGB (ex.: branco)
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    Keyboard: {
      resize: 'ionic',
      resizeOnFullScreen: true,
    },
  },
};

export default config;
