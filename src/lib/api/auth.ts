import { api } from "@/lib/axios";
import type { LoginResponse, SignupResponse } from "@/types/auth";

// POST /token
export async function login(payload: { email: string; password: string }) {
  const { data } = await api.post<LoginResponse>("/token", payload);
  return data;
}

// POST /users  (회원가입)
export async function signup(payload: {
  email: string;
  password: string;
  type: "employer" | "employee";
}) {
  const { data } = await api.post<SignupResponse>("/users", payload);
  return data;
}

/** 헬퍼: 로그인 응답에서 토큰/유형/유저ID 추출 */
export const extractAuth = (res: LoginResponse) => {
  const token = res.item.token;
  const user = res.item.user.item;
  return { token, type: user.type, userId: user.id, email: user.email };
};
