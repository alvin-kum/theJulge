<<<<<<< HEAD
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
=======
interface InputProps {
  id: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  className = '',
}: InputProps) {
  const baseStyles = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500';
  const errorStyles = error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : '';
  const disabledStyles = disabled ? 'bg-gray-100 cursor-not-allowed' : '';

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        className={`${baseStyles} ${errorStyles} ${disabledStyles}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
>>>>>>> sejin
