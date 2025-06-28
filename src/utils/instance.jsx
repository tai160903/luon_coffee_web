import axios from "axios";

// Create the main axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Create a separate instance for token refresh to avoid infinite loops
const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8080/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Variable to track if a token refresh is already in progress
let isRefreshing = false;
// Queue of requests that arrived while refreshing token
let refreshSubscribers = [];

// Function to subscribe requests to the token refresh
const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

// Function to execute all queued requests after token refresh
const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

// Function to refresh the token
const refreshAuthToken = async () => {
  try {
    // Get current refresh token
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      // If no refresh token, force logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return null;
    }

    // Call refresh token API
    const response = await refreshInstance.post("/auth/refresh-token", {
      refreshToken: refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Update storage with new tokens
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // Force logout on refresh failure
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
    return null;
  }
};

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't already tried to refresh the token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // If refreshing is in progress, add this request to queue
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(instance(originalRequest));
          });
        });
      }

      // Start refreshing
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        const newToken = await refreshAuthToken();
        isRefreshing = false;

        if (newToken) {
          // Update authorization header for the original request
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          // Process any queued requests
          onTokenRefreshed(newToken);

          // Retry the original request
          return instance(originalRequest);
        } else {
          // Token refresh failed, redirect to login
          return Promise.reject(error);
        }
      } catch (refreshError) {
        isRefreshing = false;
        // Remove tokens on refresh failure
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");

        // Redirect to login page
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // If the error is something else or token refresh also failed
    return Promise.reject(error);
  }
);

export default instance;
