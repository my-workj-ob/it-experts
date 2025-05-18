import axios from "axios";
// ok
const getApiUrl = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost") {
      return "http://localhost:8888"; // Local development
    } else if (hostname === "staging.example.com") {
      return "https://tester-nu-two.vercel.app"; // Staging
    } else {
      return "https://tester-nu-two.vercel.app"; // Production
    }
  }
  return process.env.NEXT_PUBLIC_API_URL || "https://tester-nu-two.vercel.app";
};

// Axios instance yaratish
export const axiosInstance = axios.create({
  baseURL: getApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor (har bir so‘rov oldidan token qo‘shish)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (401 bo‘lsa, tokenni yangilash)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Agar 401 bo‘lsa va oldin token yangilashga harakat qilmagan bo‘lsak
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      // **Agar refresh token yo‘q bo‘lsa yoki user allaqachon login sahifasida bo‘lsa, hech narsa qilmaymiz**
      if (!refreshToken || window.location.pathname === "/login") {
        console.warn("Refresh token yo‘q yoki allaqachon login sahifasidasiz.");
        return Promise.reject(error);
      }

      try {
        // Refresh token bilan yangi token olish
        const response = await axios.post(`${getApiUrl()}/auth/refresh-token`, {
          accessToken: refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Yangi tokenlarni saqlash
        localStorage.setItem("accessToken", accessToken);
        if (newRefreshToken)
          localStorage.setItem("refreshToken", newRefreshToken);

        // Eski so‘rovni qayta jo‘natish
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Agar refresh token ishlamasa, foydalanuvchini tashqariga chiqaramiz
        console.warn(
          "Refresh token ishlamadi, foydalanuvchi tashqariga chiqarildi."
        );
        // localStorage.removeItem('accessToken');
        // localStorage.removeItem('refreshToken');

        // **Agar hozir login sahifasida bo‘lsa, yana /login sahifasiga yo‘naltirmaymiz**
        if (window.location.pathname !== "/login") {
          // window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
