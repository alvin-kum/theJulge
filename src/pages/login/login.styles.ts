import styled from "styled-components";

interface InputProps {
  isError?: boolean;
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




export const SignupText = styled.p`
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
`;

export const SignupLink = styled.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;
