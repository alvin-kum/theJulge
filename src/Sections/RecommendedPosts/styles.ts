import styled from "styled-components";

// 맞춤공고 섹션 wrapper
export const RecommendedSection = styled.section`
  width: 100%;
  min-height: 381px;
  padding-left: 12px;      /* 왼쪽 여백 고정 */
  background-color: #FFEBE7;

  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center;     /* 세로 중앙 */
  
  @media (min-width: 768px) {
    min-height: 535px;
    padding-left: 60px;         /* 데스크탑 왼쪽 여백 고정 */
  }
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  
  display: flex;
  flex-direction: column;
  gap: 24px; /* 제목과 카드 간격 */

  @media (min-width: 768px) {
    max-width: calc(312px * 3 + 32px); /* 카드 폭 3개 + 최소 gap 2개 */
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