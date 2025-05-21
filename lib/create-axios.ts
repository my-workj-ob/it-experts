"use client";
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

// Dynamic baseURL olish
const getApiUrl = (): string => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost") {
      return "http://localhost:8888"; // Local
    } else if (hostname === "staging.example.com") {
      return "https://tester-nu-two.vercel.app"; // Staging
    } else {
      return "https://tester-nu-two.vercel.app"; // Production
    }
  }
  return process.env.NEXT_PUBLIC_API_URL || "https://tester-nu-two.vercel.app";
};

// Axios instance yaratish
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Token helperlar
const getAccessToken = (): string | null => localStorage.getItem("accessToken");
const getRefreshToken = (): string | null =>
  localStorage.getItem("refreshToken");
const setAccessToken = (token: string): void =>
  localStorage.setItem("accessToken", token);
const setRefreshToken = (token: string): void =>
  localStorage.setItem("refreshToken", token);

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
// Refresh token queue logikasi (agar bir nechta request parallel bo‘lsa)
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (error.response?.status === 404) return Promise.reject(error);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== "undefined"
    ) {
      if (
        typeof window !== "undefined" &&
        window.location.pathname === "/login"
      ) {
        return Promise.reject(error); // Refresh harakatini bu sahifada bajarma
      }
      if (!getRefreshToken()) {
        if (window.location.pathname !== "/") {
          window.location.href = "/login";
        }
        throw new Error("Refresh token yo'q");
      }
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject: (err: AxiosError) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        const { data } = await axios.post(`${getApiUrl()}/auth/refresh-token`, {
          accessToken: refreshToken,
        });

        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        if (newAccessToken) setAccessToken(newAccessToken);
        if (newRefreshToken) setRefreshToken(newRefreshToken);

        processQueue(null, newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError: any) {
        processQueue(refreshError, null);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        if (
          (typeof window !== "undefined" &&
            window.location.pathname === "/login") ||
          window.location.pathname !== "/"
        ) {
          return Promise.reject(error); // Refresh harakatini bu sahifada bajarma
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
