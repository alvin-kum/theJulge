import styled from "styled-components";

// 전체 페이지
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  max-width: 964px;
  margin: 32px auto 0;
  background: #fafafa;
  padding: 20px;
  box-sizing: border-box;
  position: relative; 
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
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 24px;
`;

// 기본 인풋
export const InputField = styled.input`
  width : 300px;
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
  width: 100%;
  max-width: 964px;
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
  width: 100%;
  max-width: 312px;
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

// 닫기 버튼
export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #1a1a1a;

  &:hover {
    color: #ea3c12;
  }
`;
