import styled, { css } from "styled-components";

type SizeAndColor = {
  size:
    | "fill" //width: 100%
    | "large" // width: 350px
    | "varLarge150" // width: 350px => width: 150px
    | "varLarge108" // width: 350px => width: 108px
    | "medium" // width: 108px
    | "varMedium" // width: 170px => width: 108px
    | "small"; // width: 82px
  color: "primary" | "secondary"; // "red" | "white"
};

const sizeStyles = {
  fill: css`
    width: 100%;
  `,
  large: css`
    width: 350px;
  `,
  varLarge150: css`
    width: 150px;
  `,
  varLarge108: css`
    width: 108px;
  `,
  medium: css`
    width: 108px;
  `,
  varMedium: css`
    width: 170px;
  `,
  small: css`
    width: 82px;
  `,
};

const colorStyles = {
  primary: css`
    background-color: red;
    color: white;
  `,
  secondary: css`
    background-color: white;
    color: red;
    border: 1px solid red;
  `,
};

const StyledButton = styled.button<SizeAndColor & { disabled: boolean }>`
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  ${({ size }) => sizeStyles[size]}
  ${({ color }) => colorStyles[color]}
  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0.6;
          cursor: not-allowed;
        `
      : css`
          cursor: pointer;
        `}
`;

const CustomButton = ({
  size,
  color,
  disabled,
  text,
  handleClick,
}: {
  disabled: boolean;
  text: string;
  handleClick: () => void;
} & SizeAndColor) => {
  return (
    <StyledButton
      size={size}
      color={color}
      disabled={disabled}
      onClick={handleClick}
    >
      {text}
    </StyledButton>
  );
};

export default CustomButton;
