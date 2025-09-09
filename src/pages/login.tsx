// src/pages/login.tsx

import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import Input from "@/components/Input";
import CustomButton from "@/components/button/CustomButton";
import { login } from "../lib/api/auth";
import {
  Wrapper,
  FormContainer,
  Logo,
  Label,
  SignupText,
  SignupLink,
  ErrorText,
} from "../styles/login.styles";
import Modal from "../components/Modal"; // 공통 모달 import

export default function LoginPage() {
  const router = useRouter();

  // 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 모달 상태
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 이메일 유효성 검사
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError("이메일 형식으로 작성해 주세요.");
    } else {
      setEmailError("");
    }
  };

  // 비밀번호 유효성 검사
  const handlePasswordBlur = () => {
    if (password.length < 8) {
      setPasswordError("8자 이상 작성해 주세요.");
    } else {
      setPasswordError("");
    }
  };

  // 로그인 버튼 클릭
  const handleLogin = async () => {
    if (!email || !password) {
      openModal("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    if (password.length < 8) {
      openModal("비밀번호가 8자 이상이어야 합니다.");
      return;
    }

    try {
      // ✅ 실제 로그인 API 호출
      const res = await login(email, password);

      // 여기서 auth.ts가 알아서 localStorage에 token 저장함
      openModal("로그인 성공!");

      // 로그인 성공 후 페이지 이동
      setTimeout(() => {
        router.push("/"); // 공고 리스트 페이지
      }, 1000);
    } catch (error: any) {
      // 서버에서 오는 에러 메시지 처리
      if (error.response?.data?.message) {
        openModal(error.response.data.message);
      } else {
        openModal("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  // 로고 클릭 → 공고 리스트로 이동
  const handleLogoClick = () => {
    router.push("/");
  };

  // 회원가입 클릭 → 회원가입 페이지로 이동
  const handleSignupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/signup");
  };

  return (
    <Wrapper>
      <FormContainer>
        <Logo onClick={handleLogoClick}>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={248} // 원하는 크기 지정
            height={45}
            priority
          />
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
        />
        {passwordError && <ErrorText>{passwordError}</ErrorText>}

        <div style={{ marginTop: "24px" }}>
          <CustomButton
            size="fill"
            color="primary"
            disabled={false}
            text="로그인 하기"
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
