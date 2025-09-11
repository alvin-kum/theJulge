import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input<{ $isError?: boolean }>`
  flex: 1;
  height: 58px;
  padding: 16px 20px;               /* 기본 padding */
  border: 1px solid ${({ $isError }) => ($isError ? "#dc2626" : "#CBC9CF")};
  border-radius: 6px;
  box-sizing: border-box;
  
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #111322;
`;

export const StyledTextarea = styled.textarea`
  flex: 1;
  height: 153px;
  padding: 16px 20px;
  border-radius: 6px;
  border: 1px solid #CBC9CF;

  resize: none;
  overflow-y: auto;

  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #111322;
`;