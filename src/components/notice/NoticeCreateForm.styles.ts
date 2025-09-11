import styled from "styled-components";

// 컨테이너
export const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 40px 20px 80px;
  background-color: #FAFAFA;

  @media (min-width: 768px) {
    padding: 60px 5%;
  }
`;

// 제목
export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  line-height: 100%;
  white-space: nowrap;
  margin-bottom: 24px;
`;

// 최상위 form
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

// 그리드 컨테이너 (1~3열)
export const FormFields = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* 모바일 1열 */
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 태블릿 2열 */
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr); /* 데스크탑 3열 */
  }
`;

// InputWrapper: FieldLabel + Input/Textarea + Unit 포함
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  gap: 8px;
`;

// FieldLabel: 입력 필드 상단에 고정
export const FieldLabel = styled.label`
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #111322;
`;

// Input과 Unit 같이 감싸기
export const InputInnerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 58px;
  display: flex;
  align-items: center;
`;

// Unit 표시용
export const UnitLabel = styled.span`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 14px;
  pointer-events: none;

  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #111322;
`;

// 버튼 부모 컨테이너
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 제출 버튼
export const SubmitButton = styled.button`
  width: 100%;
  max-width: 351px;
  height: 48px;
  padding: 14px 0;
  background-color: #EA3C12;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  color: #FFFFFF;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;

  @media (min-width: 768px) {
    max-width: 312px;
  }
`;
