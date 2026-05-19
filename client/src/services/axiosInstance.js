import axios from 'axios';

// ─── Base instance ─────────────────────────────────────────────────────────
const api = axios.create({
  baseURL:         import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,   // send httpOnly refresh token cookie on every request
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,          // 15s — fail fast, don't leave the UI hanging
});

// ─── Request interceptor — attach access token ────────────────────────────
api.interceptors.request.use(
  (config) => {
    // Auth store is imported lazily to avoid circular dependency at module init
    const { getState } = require('../store/authStore').default;
    const token = getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response interceptor — silent token refresh on 401 ──────────────────
let isRefreshing  = false;
let failedQueue   = [];   // requests waiting while token is being refreshed

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Only attempt refresh on 401, and not on the refresh endpoint itself
    // _retry flag prevents infinite loops
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        // Another request is already refreshing — queue this one
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh token is in the httpOnly cookie — no body needed
        const { data } = await api.post('/auth/refresh');
        const newAccessToken = data.accessToken;

        // Update store with new access token
        const { getState } = require('../store/authStore').default;
        getState().setAccessToken(newAccessToken);

        // Update header and retry queued requests
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed — session is dead, log the user out
        processQueue(refreshError, null);

        const { getState } = require('../store/authStore').default;
        getState().clearAuth();

        // Redirect to login — avoid importing react-router here
        window.location.href = '/login';

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;