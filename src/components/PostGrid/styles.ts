import styled from "styled-components";

/** 맞춤공고 **/
export const SwipeWrapper = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  justify-content: space-between; 

  & > * {
    flex: 1 1 auto;
    scroll-snap-align: start;
  }

  & > *:last-child {
    margin-right: 12px; /* 마지막 카드 뒤에 여백 추가 */
    }

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) { 
    & > * {
      flex: 0 0 312px;
      max-width: 312px; /* 원하는 최대 카드 폭 */;
    }

    & > *:last-child {
      margin-right: 60px; /* 마지막 카드 뒤에 여백 추가 */
      }

  }

  @media (min-width: 1440px) {
    overflow: hidden;        /* 데스크탑에서는 스와이프 해제 */
    scroll-snap-type: none;

    & > *:last-child {
      margin-right: 0; /* 데스크탑에서는 필요 없음 */
    }
  }
`;

/** 전체공고 **/
export const GridWrapper = styled.div`
  display: grid;
  gap: 10px;

  /* 모바일: 2열 */
  grid-template-columns: repeat(2, 1fr);

  /* 태블릿(>=768): 2열 */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* 데스크탑(>=1440): 3열 */
  @media (min-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

