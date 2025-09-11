import axios from "axios";

// ✅ 토큰 필요 없는 요청 (회원가입, 로그인 등)
export const plainAxios = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api/17-3/the-julge",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 토큰 필요한 요청 (내 정보, 공고 등록 등)
export const authAxios = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api/17-3/the-julge",
  headers: {
    "Content-Type": "application/json",
  },
});

authAxios.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 응답 인터셉터: 토큰 만료/401이면 로그인 페이지로 리다이렉트
authAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (typeof window !== "undefined") {
      const status = err?.response?.status;
      if (status === 401) {
        // 토큰 제거
        localStorage.removeItem("accessToken");

        // 현재 경로를 next 파라미터로 붙여서 로그인 페이지로 보냄
        const next = window.location.pathname + window.location.search;
        window.location.href = `/login?next=${encodeURIComponent(next)}`;
      }
    }
    return Promise.reject(err);
  }
);
