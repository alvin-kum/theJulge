import styled from "styled-components";

/** 맞춤공고 **/
export const SwipeWrapper = styled.div`
  display: flex;
  margin-right: -12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  justify-content: flex-start;

  & > * {
    flex: 1 1 auto;
    scroll-snap-align: start;
    margin-right: 10px; /* gap 대신 margin-right 사용 */
  }

  /* 마지막 카드의 margin-right 제거 */
  & > *:last-child {
    margin-right: 10px;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) { 
    margin-right: -60px;
    
    & > * {
      flex: 0 0 312px;
      max-width: 312px;
      margin-right: 10px;
    }
    
    & > *:last-child {
      margin-right: 60px;
    }
  }

  @media (min-width: 1440px) {
    overflow: hidden;
    scroll-snap-type: none;

    & > *:last-child {
      margin-right: 0;
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

