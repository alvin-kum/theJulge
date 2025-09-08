import styled from "styled-components";

// 전체 페이지
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;         
  min-height: 100vh;   
  background-color: #fafafa;
  box-sizing: border-box;
`;

// 헤더 자리
export const HeaderPlaceholder = styled.div`
  width: 100%;
  
  background: #f1f1f1;
  text-align: center;
  line-height: 60px;
  font-size: 14px;
  color: #999;
`;

// 프로필 컨테이너
export const ProfileContainer = styled.div`
  width: 100%;
  max-width: 964px;       // ✅ 최대 너비 제한
  margin: 32px auto 0;    // ✅ 수직 간격 + 수평 중앙 정렬
  background: #FAFAFA;
  padding: 20px;
  box-sizing: border-box;
`;

// 제목
export const Title = styled.h2`
  font-family: "Spoqa Han Sans Neo", sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 32px;
`;

// 입력 행 (이름/연락처/지역)
export const FormRow = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

// 기본 인풋
export const InputField = styled.input`
  width: 308px;
  height: 58px;
  padding: 16px 20px;
  border: 1px solid #ccc;
  border-radius: 6px;

  font-family: "Spoqa Han Sans Neo", sans-serif;
  font-size: 16px;
  line-height: 26px;
`;

// 소개 textarea
export const TextArea = styled.textarea`
  width: 964px;
  height: 153px;
  padding: 16px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  font-family: "Spoqa Han Sans Neo", sans-serif;
  font-size: 16px;
  line-height: 26px;
  margin-bottom: 32px;
`;

// 버튼 영역
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

// 등록 버튼
export const SubmitButton = styled.button`
  width: 312px;
  height: 48px;
  background-color: #ea3c12;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #cc2f0a;
  }
`;

// Label
export const Label = styled.label`
  display: block;
  margin-bottom: 8px;

  font-family: "Spoqa Han Sans Neo", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #1a1a1a;
`;
