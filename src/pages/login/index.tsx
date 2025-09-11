// src/pages/login.tsx
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import Input from "@/components/Input/Input";
import CustomButton from "@/components/button/CustomButton";
import { login } from "@/lib/api/auth"; // 경로 정리
import {
  Wrapper,
  FormContainer,
  Logo,
  Label,
  SignupText,
  SignupLink,
  ErrorText,
} from "./login.styles";
import Modal from "@/components/Modal"; // 경로 정리
import type { AxiosError } from "axios";

export default function LoginPage() {
  const router = useRouter();
  const next = typeof router.query.next === "string" ? router.query.next : null;

  // 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  // 모달 상태
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // 이메일 유효성 검사
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
  const handleEmailBlur = () => {
    if (!validateEmail(email)) setEmailError("이메일 형식으로 작성해 주세요.");
    else setEmailError("");
  };

  // 비밀번호 유효성 검사
  const handlePasswordBlur = () => {
    if (password.length < 8) setPasswordError("8자 이상 작성해 주세요.");
    else setPasswordError("");
  };

  // 로그인 버튼 클릭
  const handleLogin = async () => {
    if (!email || !password) {
      openModal("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    if (!validateEmail(email)) {
      openModal("이메일 형식을 확인해주세요.");
      return;
    }
    if (password.length < 8) {
      openModal("비밀번호가 8자 이상이어야 합니다.");
      return;
    }

    try {
      setLoading(true);

      // ✅ 실제 로그인 API 호출 (토큰/유저정보는 auth.ts에서 localStorage에 저장)
      const res = await login(email, password);
      const userType = res.item.user.item.type as "employer" | "employee";

      // 안내 모달 (선택)
      openModal("로그인 성공!");

      // ✅ next 파라미터가 있으면 원래 보던 페이지로 복귀
      // 없으면 역할별 기본 라우팅
      setTimeout(() => {
        if (next) {
          router.replace(next);
        } else {
          if (userType === "employer")
            router.replace("/shops/create"); // 사장님 기본 진입
          else router.replace("/profile"); // 알바 기본 진입
          // 필요시 공고 리스트가 기본이면: router.replace("/");
        }
      }, 600);
    } catch (e: unknown) {
      const err = e as AxiosError<{ message?: string }>;
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "로그인에 실패했습니다. 다시 시도해주세요.";
      openModal(msg);
    } finally {
      setLoading(false);
    }
  };

  // 로고 클릭 → 공고 리스트(또는 원하는 경로)로 이동
  const handleLogoClick = () => {
    router.push("/");
  };

  // 회원가입 클릭 → 회원가입 페이지로 이동
  const handleSignupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // 회원가입도 next를 이어가고 싶다면 아래처럼 전달:
    // router.push(`/signup${next ? `?next=${encodeURIComponent(next)}` : ""}`);
    router.push("/signup");
  };

  return (
    <Wrapper>
      <FormContainer>
        <Logo onClick={handleLogoClick}>
          <Image src="/logo.svg" alt="Logo" width={248} height={45} priority />
        </Logo>

        <Label>이메일</Label>
        <Input
          type="email"
          placeholder="입력"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          onBlur={handleEmailBlur}
          isError={!!emailError}
        />
        {emailError && <ErrorText>{emailError}</ErrorText>}

        <Label>비밀번호</Label>
        <Input
          type="password"
          placeholder="입력"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          onBlur={handlePasswordBlur}
          isError={!!passwordError}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && !loading) handleLogin();
          }}
        />
        {passwordError && <ErrorText>{passwordError}</ErrorText>}

        <div style={{ marginTop: "24px" }}>
          <CustomButton
            size="fill"
            color="primary"
            disabled={loading}
            text={loading ? "로그인 중..." : "로그인 하기"}
            handleClick={handleLogin}
          />
        </div>

        <SignupText>
          회원이 아니신가요?{" "}
          <SignupLink href="#" onClick={handleSignupClick}>
            회원가입하기
          </SignupLink>
        </SignupText>
      </FormContainer>

      {/* 모달 */}
      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </Wrapper>
  );
}
