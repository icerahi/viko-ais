const BASE_URL = "http://localhost:5000/api/v1";

async function fetchClient<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // matches withCredentials: true
  });

  // Try to parse JSON, but handle cases where response might be empty
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // Handle 401 etc if needed, similar to axios interceptor
    if (response.status === 401) {
       // window.location.href = '/login'; 
    }
    throw new Error(data.message || `API request failed with status ${response.status}`);
  }

  return data;
}

const api = {
  get: <T = any>(url: string, options?: RequestInit) => 
    fetchClient<T>(url, { ...options, method: 'GET' }),
    
  post: <T = any>(url: string, body: any, options?: RequestInit) => 
    fetchClient<T>(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
    
  patch: <T = any>(url: string, body: any, options?: RequestInit) => 
    fetchClient<T>(url, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
    
  delete: <T = any>(url: string, options?: RequestInit) => 
    fetchClient<T>(url, { ...options, method: 'DELETE' }),
};

export default api;
