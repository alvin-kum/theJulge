import React from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

const Input = ({ isError = false, className = "", ...props }: InputProps) => {
  return (
    <input
      className={`${styles.input} ${isError ? styles.error : ""} ${className}`}
      {...props}
    />
  );
};

export default Input;
