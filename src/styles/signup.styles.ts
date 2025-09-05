import styled from "styled-components";

interface InputProps {
  isError?: boolean;
}

interface UserTypeProps {
  $isActive?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Logo = styled.div`
  text-align: center;
  margin-bottom: 32px;
  cursor: pointer;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
  margin-top: 16px;
`;





export const LoginText = styled.p`
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
`;

export const LoginLink = styled.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

/* 회원 유형 선택 */
export const UserTypeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

export const UserTypeButton = styled.button<UserTypeProps>`
  flex: 1;
  margin: 0 4px;
  padding: 10px;
  border: 2px solid ${({ $isActive }) => ($isActive ? "#ea4c1d" : "#ddd")};
  border-radius: 24px;
  background-color: ${({ $isActive }) => ($isActive ? "#fff3f0" : "#fff")};
  color: ${({ $isActive }) => ($isActive ? "#ea4c1d" : "#333")};
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const CheckCircle = styled.span<{ $isActive: boolean }>`
  width: 16px;
  height: 16px;
  border: 2px solid ${({ $isActive }) => ($isActive ? "#ea4c1d" : "#ddd")};
  border-radius: 50%;
  background-color: ${({ $isActive }) => ($isActive ? "#ea4c1d" : "#fff")};
  display: inline-block;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 4px;
    width: 4px;
    height: 8px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  }
`;



