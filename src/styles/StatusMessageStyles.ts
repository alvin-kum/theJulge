import styled from "styled-components";

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: #4b5563; 
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: 1rem;
`;

export const ErrorText = styled.p`
  color: #ef4444; 
  margin-bottom: 1rem;
`;

export const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3b82f6; 
  color: white;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #2563eb; 
  }
`;
