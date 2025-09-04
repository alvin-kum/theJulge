import { plainAxios, authAxios } from "../axios"; // 인스턴스 둘 다 import

// ✅ 로그인 (토큰 없음)
export const login = async (email: string, password: string) => {
  const res = await plainAxios.post("/token", { email, password });
  
  // ① 응답에서 토큰 & 유저정보 꺼내기
  const token = res.data.item.token;
  const userId = res.data.item.user.item.id;
  const userType = res.data.item.user.item.type;

  // ② localStorage에 저장 (로그인 유지)
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userType", userType);
  }

  // ③ 호출한 컴포넌트에서도 쓸 수 있게 리턴
  return res.data;
};

// ✅ 회원가입 (토큰 없음)
export const register = async (
  email: string,
  password: string,
  type: "employee" | "employer"
) => {
  const res = await plainAxios.post("/users", {
    email,
    password,
    type,
  });
  return res.data;
};

// ✅ 내 정보 조회 (토큰 필요 → authAxios 사용)
export const fetchMyInfo = async () => {
  const res = await authAxios.get("/users/me");
  return res.data.item; // { id, email, type, name, phone, address, bio ... }
};
