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

// 버튼 부모 컨테이너
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;  /* 가로 중앙 */
  align-items: center;      /* 세로 중앙 */
`;

// 제출 버튼
export const SubmitButton = styled.button`
  width: 100%;
  max-width: 351px; /* 최대 크기 */
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
  white-space: nowrap; /* 줄바꿈 방지 */

  @media (min-width: 768px) {
    max-width: 312px;
  }
`;
