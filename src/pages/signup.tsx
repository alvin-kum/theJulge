import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Input from "@/components/Input";
import CustomButton from "@/components/button/CustomButton";
import { register } from "../lib/api/auth";
import {
  Wrapper,
  FormContainer,
  Logo,
  Label,
  LoginText,
  LoginLink,
  ErrorText,
  UserTypeContainer,
  UserTypeButton,
  CheckCircle,
} from "../styles/signup.styles";
import Modal from "../components/Modal"; // 공통 모달 import

export default function SignupPage() {
  const router = useRouter();

  // 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"알바님" | "사장님">("알바님");

  // 에러 상태
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // 모달 상태
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalMessage("");
    setIsModalOpen(false);
  };

  // 이메일 검증
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

  // 비밀번호 검증
  const handlePasswordBlur = () => {
    if (password.length < 8) {
      setPasswordError("8자 이상 입력해주세요.");
    } else {
      setPasswordError("");
    }
  };

  // 비밀번호 확인 검증
  const handleConfirmPasswordBlur = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  // 회원가입 버튼 클릭
  const handleSignup = async () => {
    // 에러 메시지가 있는 경우는 진행 X
    if (!validateEmail(email)) {
      setEmailError("이메일 형식으로 작성해 주세요.");
      return;
    }

    if (password.length < 8) {
      setPasswordError("8자 이상 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const userTypeForApi = userType === "알바님" ? "employee" : "employer";
      await register(email, password, userTypeForApi);
      openModal("가입이 완료되었습니다!");
      setTimeout(() => {
        closeModal();
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      const message = err.response?.data?.message || "회원가입에 실패했습니다.";
      openModal(message);
    }
  };

  // 로고 클릭
  const handleLogoClick = () => {
    router.push("/");
  };

  // 로그인 페이지 이동
  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <Wrapper>
      <FormContainer>
        <Logo onClick={handleLogoClick}>
          <Image src="/logo.svg" alt="Logo" width={248} height={45} priority />
        </Logo>

        {/* 이메일 */}
        <Label>이메일</Label>
        <Input
          type="email"
          placeholder="입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
          isError={!!emailError}
        />
        {emailError && <ErrorText>{emailError}</ErrorText>}

        {/* 비밀번호 */}
        <Label>비밀번호</Label>
        <Input
          type="password"
          placeholder="입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
          isError={!!passwordError}
        />
        {passwordError && <ErrorText>{passwordError}</ErrorText>}

        {/* 비밀번호 확인 */}
        <Label>비밀번호 확인</Label>
        <Input
          type="password"
          placeholder="입력"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={handleConfirmPasswordBlur}
          isError={!!confirmPasswordError}
        />
        {confirmPasswordError && <ErrorText>{confirmPasswordError}</ErrorText>}

        {/* 회원 유형 */}
        <Label>회원 유형</Label>
        <UserTypeContainer>
          <UserTypeButton
            $isActive={userType === "알바님"}
            onClick={() => setUserType("알바님")}
            type="button"
          >
            <CheckCircle $isActive={userType === "알바님"} />
            알바님
          </UserTypeButton>

          <UserTypeButton
            $isActive={userType === "사장님"}
            onClick={() => setUserType("사장님")}
            type="button"
          >
            <CheckCircle $isActive={userType === "사장님"} />
            사장님
          </UserTypeButton>
        </UserTypeContainer>

        <div style={{ marginTop: "24px" }}>
          <CustomButton
            size="fill"
            color="primary"
            disabled={false}
            text="가입하기"
            handleClick={handleSignup}
          />
        </div>

        <LoginText>
          이미 가입하셨나요?{" "}
          <LoginLink href="#" onClick={handleLoginClick}>
            로그인하기
          </LoginLink>
        </LoginText>
      </FormContainer>

      {/* 공통 모달 */}
      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </Wrapper>
  );
}
