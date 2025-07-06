import axios from "axios";
import { updateTokens } from "../redux/slices/authSlice";

let store;
export const setStore = (_store) => {
  store = _store;
};

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

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

const refreshAuthToken = async () => {
  try {
    const refreshToken = store.getState()?.auth?.tokens?.refreshToken;

    console.log("Refreshing token with refreshToken:", refreshToken);

    if (!refreshToken) {
      window.location.href = "/login";
      return null;
    }

    const response = await refreshInstance.post("/User/refresh-token", {
      refreshToken: refreshToken,
    });
    console.log("Token refresh response:", response);

    const { accessToken, refreshToken: newRefreshToken } =
      response.data.data || response.data;

    console.log("New tokens received:", {
      accessToken: accessToken,
      newRefreshToken: newRefreshToken,
    });
    store.dispatch(
      updateTokens({
        accessToken: accessToken,
        refreshToken: newRefreshToken,
      })
    );

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:" + error.message);
    return null;
  }
};

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = store.getState()?.auth?.tokens?.accessToken;

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
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // If the error is something else or token refresh also failed
    return Promise.reject(error);
  }
);

export default instance;
