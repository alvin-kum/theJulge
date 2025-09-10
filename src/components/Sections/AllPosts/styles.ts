import styled from "styled-components";

// 전체공고 섹션 wrapper
export const AllPostsSection = styled.section`
  width: 100%;
  padding: 40px 12px;
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    padding: 60px 60px;
  }
`;

export const Container = styled.div`
  width: 100%;  
  display: flex;
  flex-direction: column;
  gap: 16px;               // 내부 요소 간 간격

  @media (min-width: 768px) {
    max-width: calc(312px * 3 + 20px);
    gap: 40px;               // 내부 요소 간 간격
  }
`;

// 정렬 & 필터 컨트롤 wrapper
export const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: flex-start; /* 타이틀 왼쪽 정렬 */
  gap: 16px; /* 타이틀과 버튼 그룹 간 간격 */

  @media (min-width: 768px) {
    width: 100%;
    flex-direction: row; /* 태블릿 이상: 가로 정렬 */
    justify-content: space-between; /* 좌측 타이틀, 우측 버튼 그룹 */
    align-items: center;
    gap: 0;
  }
`;

// 제목 스타일
export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  line-height: 100%;
  white-space: nowrap;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

// 검색페이지> keyword 강조용 span
export const Highlight = styled.span`
  color: #EA3C12;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;        /* 드롭다운과 버튼 간격 */
  align-items: center;
`;

// 조건에 맞는 검색결과 없음 문구 스타일
export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center; /* 가로 중앙 */
  align-items: center;     /* 세로 중앙 */
  height: 250px;           /* 높이 고정 */
  width: 100%;
  color: #111322;
  font-size: 14px;
  font-weight: 400;

  @media (min-width: 768px) {
    font-size: 18px;
    height: 350px;
  }
`;