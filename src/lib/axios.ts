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
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
