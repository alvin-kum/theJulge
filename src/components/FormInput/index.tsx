import React, { useRef } from "react";
import {
  Wrapper,
  Label,
  InputWrapper,
  StyledInput,
  StyledTextarea,
  Unit,
} from "./styles";

type InputProps =
  | (React.InputHTMLAttributes<HTMLInputElement> & {
      isError?: boolean;
      label?: string;
      unit?: string;
      type?: "text" | "number" | "datetime-local";
      onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    })
  | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
      isError?: boolean;
      label?: string;
      unit?: string;
      type: "textarea";
      onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    });

const Input = ({
  isError = false,
  label,
  unit,
  type = "text",
  ...props
}: InputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
  };

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        {type === "textarea" ? (
          <StyledTextarea
            ref={textareaRef}
            $isError={isError}
            $hasUnit={!!unit}
            onInput={handleTextareaInput}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} // textarea 전용 속성 보장
          />
        ) : (
          <StyledInput
            $isError={isError}
            $hasUnit={!!unit}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)} // input 전용 속성 보장
          />
        )}
        {unit && <Unit>{unit}</Unit>}
      </InputWrapper>
    </Wrapper>
  );
};

export default Input;
