// core/config/env.ts
// Environment configuration

export const config = {
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://api.example.com/v1',
    timeout: 30000, // 30 seconds
  },
  app: {
    name: 'City Discovery',
    version: '1.0.0',
  },
};

// Token storage key
export const TOKEN_STORAGE_KEY = '@cityDiscovery:authToken';
