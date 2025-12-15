// data/api/httpClient.ts
// HTTP client with token management and error handling

import { config, TOKEN_STORAGE_KEY } from '../../core/config/env';
import { AppError, ErrorType } from '../../domain/common/Result';

// Simple in-memory token storage (replace with AsyncStorage/SecureStore in production)
let tokenStorage: string | null = null;

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

class HttpClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string = config.api.baseUrl, timeout: number = config.api.timeout) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  // Get auth token from storage
  private async getToken(): Promise<string | null> {
    // TODO: Replace with AsyncStorage or SecureStore in production
    // For now, using in-memory storage
    return tokenStorage;
  }

  // Save auth token to storage
  async setToken(token: string): Promise<void> {
    // TODO: Replace with AsyncStorage or SecureStore in production
    tokenStorage = token;
  }

  // Remove auth token from storage
  async clearToken(): Promise<void> {
    // TODO: Replace with AsyncStorage or SecureStore in production
    tokenStorage = null;
  }

  // Build headers with auth token
  private async buildHeaders(customHeaders?: Record<string, string>): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = await this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Handle API errors
  private handleError(error: any): AppError {
    if (error instanceof AppError) {
      return error;
    }

    // Network errors
    if (error.message?.includes('Network') || error.message?.includes('fetch')) {
      return new AppError('Network error. Please check your connection.', ErrorType.NetworkFailure);
    }

    // Timeout errors
    if (error.message?.includes('timeout')) {
      return new AppError('Request timeout. Please try again.', ErrorType.NetworkFailure);
    }

    // HTTP status errors
    if (error.status) {
      switch (error.status) {
        case 401:
          return new AppError('Unauthorized. Please login again.', ErrorType.AuthFailure);
        case 403:
          return new AppError('Access forbidden.', ErrorType.AuthFailure);
        case 404:
          return new AppError('Resource not found.', ErrorType.NotFoundFailure);
        case 422:
          return new AppError(error.message || 'Validation error.', ErrorType.ValidationFailure);
        case 500:
          return new AppError('Server error. Please try again later.', ErrorType.NetworkFailure);
        default:
          return new AppError(error.message || 'An error occurred.', ErrorType.NetworkFailure);
      }
    }

    return new AppError(error.message || 'An unexpected error occurred.', ErrorType.UnknownFailure);
  }

  // Main request method
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', headers: customHeaders, body, timeout = this.timeout } = options;

    const url = `${this.baseUrl}${endpoint}`;
    const headers = await this.buildHeaders(customHeaders);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const fetchOptions: RequestInit = {
        method,
        headers,
        signal: controller.signal,
      };

      if (body && method !== 'GET') {
        if (body instanceof FormData) {
          // Remove Content-Type for FormData (browser will set it with boundary)
          delete headers['Content-Type'];
          fetchOptions.body = body;
        } else {
          fetchOptions.body = JSON.stringify(body);
        }
      }

      const response = await fetch(url, fetchOptions);
      clearTimeout(timeoutId);

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        if (!response.ok) {
          throw new AppError(`HTTP ${response.status}: ${response.statusText}`, ErrorType.NetworkFailure);
        }
        return (await response.text()) as T;
      }

      const data = await response.json();

      // Handle API error responses
      if (!response.ok) {
        const error = {
          status: response.status,
          message: data.message || data.error || `HTTP ${response.status}: ${response.statusText}`,
        };
        throw this.handleError(error);
      }

      return data as T;
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new AppError('Request timeout. Please try again.', ErrorType.NetworkFailure);
      }

      throw this.handleError(error);
    }
  }

  // Convenience methods
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  async post<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body, headers });
  }

  async put<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body, headers });
  }

  async patch<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body, headers });
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }
}

// Singleton instance
export const httpClient = new HttpClient();
