/**
 * API Service Layer
 * Centralized HTTP client with authentication and error handling
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Token management
export const TokenService = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  },
  
  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('auth_token', token);
  },
  
  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_token');
  },
};

// Custom error class
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// HTTP Client
class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = TokenService.getToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || 'An error occurred',
          response.status,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred');
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const queryString = params
      ? '?' + new URLSearchParams(params).toString()
      : '';
    return this.request<T>(`${endpoint}${queryString}`, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create HTTP client instance
const httpClient = new HttpClient(API_BASE_URL);

// API Endpoints organized by resource
export const api = {
  // Authentication
  auth: {
    login: (email: string, password: string) =>
      httpClient.post<{ access_token: string; user: any }>('/auth/login', {
        email,
        password,
      }),
    register: (data: any) => httpClient.post('/auth/register', data),
    me: () => httpClient.get('/auth/me'),
  },

  // Customers
  customers: {
    getAll: (search?: string) =>
      httpClient.get('/customers', search ? { search } : undefined),
    getById: (id: string) => httpClient.get(`/customers/${id}`),
    getStats: () => httpClient.get('/customers/stats'),
    create: (data: any) => httpClient.post('/customers', data),
    update: (id: string, data: any) => httpClient.patch(`/customers/${id}`, data),
    delete: (id: string) => httpClient.delete(`/customers/${id}`),
  },

  // Drugs/Inventory
  drugs: {
    getAll: (params?: { search?: string; category?: string; lowStock?: boolean }) =>
      httpClient.get('/drugs', params),
    getById: (id: string) => httpClient.get(`/drugs/${id}`),
    getStats: () => httpClient.get('/drugs/stats'),
    getLowStockAlerts: () => httpClient.get('/drugs/alerts/low-stock'),
    getBatches: (drugId?: string) =>
      httpClient.get('/drugs/batches', drugId ? { drugId } : undefined),
    create: (data: any) => httpClient.post('/drugs', data),
    update: (id: string, data: any) => httpClient.patch(`/drugs/${id}`, data),
    updateStock: (id: string, quantity: number) =>
      httpClient.patch(`/drugs/${id}/stock`, { quantity }),
    delete: (id: string) => httpClient.delete(`/drugs/${id}`),
    createBatch: (data: any) => httpClient.post('/drugs/batches', data),
  },

  // Invoices
  invoices: {
    getAll: (params?: {
      status?: string;
      customerId?: string;
      startDate?: string;
      endDate?: string;
    }) => httpClient.get('/invoices', params),
    getById: (id: string) => httpClient.get(`/invoices/${id}`),
    getStats: () => httpClient.get('/invoices/stats'),
    getRecurring: (status?: string) =>
      httpClient.get('/invoices/recurring', status ? { status } : undefined),
    create: (data: any) => httpClient.post('/invoices', data),
    update: (id: string, data: any) => httpClient.patch(`/invoices/${id}`, data),
    delete: (id: string) => httpClient.delete(`/invoices/${id}`),
    createRecurring: (data: any) => httpClient.post('/invoices/recurring', data),
    updateRecurring: (id: string, data: any) =>
      httpClient.patch(`/invoices/recurring/${id}`, data),
  },

  // Prescriptions
  prescriptions: {
    getAll: (params?: { status?: string; customerId?: string; doctorId?: string }) =>
      httpClient.get('/prescriptions', params),
    getById: (id: string) => httpClient.get(`/prescriptions/${id}`),
    getStats: () => httpClient.get('/prescriptions/stats'),
    create: (data: any) => httpClient.post('/prescriptions', data),
    update: (id: string, data: any) =>
      httpClient.patch(`/prescriptions/${id}`, data),
    verify: (id: string, data: any) =>
      httpClient.post(`/prescriptions/${id}/verify`, data),
    fill: (id: string, data: any) =>
      httpClient.post(`/prescriptions/${id}/fill`, data),
    delete: (id: string) => httpClient.delete(`/prescriptions/${id}`),
  },

  // Suppliers
  suppliers: {
    getAll: (params?: { search?: string; isActive?: boolean }) =>
      httpClient.get('/suppliers', params),
    getById: (id: string) => httpClient.get(`/suppliers/${id}`),
    getStats: () => httpClient.get('/suppliers/stats'),
    getPerformance: (id: string) => httpClient.get(`/suppliers/${id}/performance`),
    create: (data: any) => httpClient.post('/suppliers', data),
    update: (id: string, data: any) => httpClient.patch(`/suppliers/${id}`, data),
    delete: (id: string) => httpClient.delete(`/suppliers/${id}`),
  },

  // Purchase Orders
  purchaseOrders: {
    getAll: (params?: { status?: string; supplierId?: string }) =>
      httpClient.get('/purchase-orders', params),
    getById: (id: string) => httpClient.get(`/purchase-orders/${id}`),
    getStats: () => httpClient.get('/purchase-orders/stats'),
    create: (data: any) => httpClient.post('/purchase-orders', data),
    update: (id: string, data: any) =>
      httpClient.patch(`/purchase-orders/${id}`, data),
    approve: (id: string, approvedBy: string) =>
      httpClient.post(`/purchase-orders/${id}/approve`, { approvedBy }),
    receive: (id: string, data: any) =>
      httpClient.post(`/purchase-orders/${id}/receive`, data),
    delete: (id: string) => httpClient.delete(`/purchase-orders/${id}`),
  },

  // Reports
  reports: {
    getSales: (startDate?: string, endDate?: string) =>
      httpClient.get('/reports/sales', { startDate, endDate }),
    getInventory: () => httpClient.get('/reports/inventory'),
    getPurchases: (startDate?: string, endDate?: string) =>
      httpClient.get('/reports/purchases', { startDate, endDate }),
    getCustomers: () => httpClient.get('/reports/customers'),
    getDashboard: () => httpClient.get('/reports/dashboard'),
  },

  // Profile
  profile: {
    get: () => httpClient.get('/profile'),
    update: (data: any) => httpClient.patch('/profile', data),
    changePassword: (currentPassword: string, newPassword: string) =>
      httpClient.patch('/profile/change-password', {
        currentPassword,
        newPassword,
      }),
  },
};

export default api;
