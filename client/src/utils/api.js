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

// Create an API client that automatically normalizes URLs with proper CORS settings
export const apiClient = axios.create({
  withCredentials: true, // Include credentials in the request
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor to normalize URLs
apiClient.interceptors.request.use((config) => {
  // Log each request for debugging
  console.log(
    `Making ${config.method?.toUpperCase() || "API"} request to: ${config.url}`
  );

  // Ensure URL doesn't have double slashes anywhere
  if (config.url && config.url.includes("//")) {
    // Keep http:// or https:// intact but replace any other double slashes
    config.url = config.url.replace(
      /(https?:\/\/)|(\/\/+)/g,
      (match, protocol) => {
        return protocol || "/";
      }
    );
    console.log(`Normalized URL: ${config.url}`);
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
