import React from "react";
import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

const Input = ({ isError = false, ...props }: InputProps) => {
  return <StyledInput $isError={isError} {...props} />;
};

export default Input; // 

// 
const StyledInput = styled.input<{ $isError?: boolean }>`
  padding: 12px;
  border: 1px solid ${({ $isError }) => ($isError ? "red" : "#ddd")};
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: ${({ $isError }) => ($isError ? "red" : "#999")};
  }
`;
