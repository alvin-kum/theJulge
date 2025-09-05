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
    max-width: calc(312px * 3 + 40px);
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

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;        /* 드롭다운과 버튼 간격 */
  align-items: center;
`;

// 상세필터 버튼
export const FilterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  
  width: fit-content;
  height: 30px;
  padding: 12px;
  border-radius: 5px;
  background-color: #FF4040;
  cursor: pointer;

  font-size: 14px;
  font-weight: 700;
  line-height: 100%;
  color: #FFFFFF;

  &:hover {
    background-color: #FF8D72;
    color: #FFFFFF;
  }
`;

export const FilterModalBackdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ $open }) => ($open ? "block" : "none")};
  z-index: 999;
`;

export const FilterModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  z-index: 1000;
`;