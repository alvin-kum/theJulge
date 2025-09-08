import style from "./CustomButton.module.css";

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

const styleSize = {
  fill: "btn-fill",
  large: "btn-large",
  varLarge150: "btn-variable-large150",
  varLarge108: "btn-variable-large108",
  medium: "btn-medium",
  varMedium: "btn-variable-medium",
  small: "btn-small",
};

const styleColor = {
  primary: "btn-primary",
  secondary: "btn-secondary",
};

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
    <button
      style={disabled ? {} : { cursor: "pointer" }}
      className={`${style[styleSize[size]]} ${style[styleColor[color]]}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
