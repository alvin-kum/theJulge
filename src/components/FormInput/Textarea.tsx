import React, { useRef } from "react";
import { StyledTextarea, Wrapper, InputWrapper } from "./styles";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.FC<TextareaProps> = ({ ...rest }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <Wrapper>
      <InputWrapper>
        <StyledTextarea ref={textareaRef} {...rest} />
      </InputWrapper>
    </Wrapper>
  );
};

export default Textarea;
