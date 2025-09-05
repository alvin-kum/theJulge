import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { login, extractAuth } from "@/lib/api/auth";
import { Auth } from "@/lib/auth";
import { redirectAfterLogin } from "@/utils/route";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, error } = useMutation({
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
    <div style={{ maxWidth: 360, margin: "48px auto" }}>
      <h1>로그인</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ email, password });
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
        <button type="submit" disabled={isPending}>
          로그인
        </button>
      </form>
      {error && <p style={{ color: "red" }}>로그인 실패</p>}
    </div>
  );
}
