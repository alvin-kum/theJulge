import React, { useRef } from "react";
import { Wrapper, InputWrapper, StyledInput, StyledTextarea } from "./styles";

// input 전용 props
interface InputElementProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  type?: "text" | "number" | "datetime-local";
}

// textarea 전용 props
interface TextareaElementProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "type"> {
  type: "textarea";
}

type InputProps = InputElementProps | TextareaElementProps;

const Input: React.FC<InputProps> = (props) => {
  const { type = "text", ...rest } = props;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const isTextarea = type === "textarea";

  return (
    <Wrapper>
      <InputWrapper>
        {isTextarea ? (
          <StyledTextarea
            ref={textareaRef}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <StyledInput
            type={type}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </InputWrapper>
    </Wrapper>
  );
};

export default Input;
