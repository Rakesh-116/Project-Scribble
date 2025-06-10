import axios from "axios";

// Function to normalize API URLs and remove double slashes
export const normalizeUrl = (baseUrl, path) => {
  // Remove trailing slash from baseUrl if present
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

  // Remove leading slash from path if present
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  // Combine them with a single slash
  return `${normalizedBase}/${normalizedPath}`;
};

// Create an API client that automatically normalizes URLs
export const apiClient = axios.create();

// Add request interceptor to normalize URLs
apiClient.interceptors.request.use((config) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URI || "";

  // If URL starts with baseUrl, normalize it
  if (config.url.startsWith(baseUrl)) {
    // Extract the path part after the baseUrl
    const pathPart = config.url.substring(baseUrl.length);
    config.url = normalizeUrl(baseUrl, pathPart);
  }

  return config;
});

// Export a convenience function for making API calls
export const api = {
  get: (url, config) => apiClient.get(url, config),
  post: (url, data, config) => apiClient.post(url, data, config),
  put: (url, data, config) => apiClient.put(url, data, config),
  delete: (url, config) => apiClient.delete(url, config),
};
