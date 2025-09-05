import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { signup, login, extractAuth } from "@/lib/api/auth";
import { Auth } from "@/lib/auth";
import { redirectAfterLogin } from "@/utils/route";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<"employer" | "employee">("employee");

  const signupMut = useMutation({ mutationFn: signup });
  const loginMut = useMutation({
    mutationFn: login,
    onSuccess: (resp) => {
      const { token, type, userId } = extractAuth(resp);
      Auth.setToken(token);
      Auth.setType(type);
      Auth.setUserId(userId);
      router.replace(redirectAfterLogin(type));
    },
  });

  return (
    <div style={{ maxWidth: 420, margin: "48px auto" }}>
      <h1>회원가입</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await signupMut.mutateAsync({ email, password, type });
            await loginMut.mutateAsync({ email, password });
          } catch {
            // 에러는 각각의 mutate error 상태로 UI에서 표시
          }
        }}
      >
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div style={{ display: "flex", gap: 16, margin: "12px 0" }}>
          <label>
            <input
              type="radio"
              name="type"
              value="employee"
              checked={type === "employee"}
              onChange={() => setType("employee")}
            />{" "}
            직원(알바)
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="employer"
              checked={type === "employer"}
              onChange={() => setType("employer")}
            />{" "}
            사장님
          </label>
        </div>

        <button
          type="submit"
          disabled={
            signupMut.status === "pending" || loginMut.status === "pending"
          }
        >
          가입하기
        </button>
      </form>

      {signupMut.error && <p style={{ color: "red" }}>회원가입 실패</p>}
      {loginMut.error && <p style={{ color: "red" }}>자동 로그인 실패</p>}
    </div>
  );
}
