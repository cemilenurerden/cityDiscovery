// core/config/env.ts
// Environment configuration

export const config = {
  api: {
    // Gateway URL - tüm istekler buraya gider, gateway uygun servise yönlendirir
    // /api/auth/*      → Identity Service (5001)
    // /api/venues/*    → Venue Service (5002)
    // /api/favorites/* → Social Service (5003)
    // /api/reviews/*   → Review Service (5004)
    
    // ÖNEMLİ: Development için kendi IP adresini .env dosyasında ayarla!
    // Örnek .env: EXPO_PUBLIC_API_BASE_URL=http://192.168.1.46:5001/api
    // Production için gerçek API URL'ini kullan
    
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://192.168.1.46:5001/api',
    timeout: 30000, // 30 seconds
  },
  app: {
    name: 'City Discovery',
    version: '1.0.0',
  },
};

// Token storage key
export const TOKEN_STORAGE_KEY = '@cityDiscovery:authToken';
