import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #111322;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledInput = styled.input<{ $isError?: boolean; $hasUnit?: boolean }>`
  flex: 1;
  height: 58px;
  padding: 16px 20px;               /* 기본 padding */
  padding-right: ${({ $hasUnit }) => ($hasUnit ? "40px" : "20px")}; /* unit 있으면 공간 확보 */
  border: 1px solid ${({ $isError }) => ($isError ? "#dc2626" : "#CBC9CF")};
  border-radius: 6px;
  box-sizing: border-box;
  
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #111322;
`;

export const StyledTextarea = styled.textarea<{ $isError?: boolean; $hasUnit?: boolean }>`
  flex: 1;
  height: 153px;
  padding: 16px 20px;;
  border-radius: 6px;
  border: 1px solid ${({ $isError }) => ($isError ? "#dc2626" : "#CBC9CF")};
  
  resize: none;
  overflow-y: auto;

  
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #111322;
`;

export const Unit = styled.span`
  position: absolute;
  right: 20px;
  
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #111322;
  pointer-events: none;
`;
