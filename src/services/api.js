const API_BASE = 'https://sanskriti-backend-lhnj.onrender.com/api';

const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'API Error');
    }
    
    // Spring Boot wrapped ApiResponse.data
    return result.data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
};

export const dashboardApi = {
  getStats: () => fetchApi('/dashboard'),
};

export const productsApi = {
  getAvailable: () => fetchApi('/products'), // Can be filtered later
  getAll: () => fetchApi('/products'),
  getById: (id) => fetchApi(`/products/${id}`),
  create: (data) => fetchApi('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export const variantsApi = {
  create: (data) => fetchApi('/variants', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export const inventoryApi = {
  stockIn: (data) => fetchApi('/inventory/stock-in', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  stockOut: (data) => fetchApi('/inventory/stock-out', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getMovements: () => fetchApi('/inventory/movements'),
};

export const ordersApi = {
  getAll: () => fetchApi('/orders'),
  create: (data) => fetchApi('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateStatus: (id, status) => fetchApi(`/orders/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
};
