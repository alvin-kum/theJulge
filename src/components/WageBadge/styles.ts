import styled from "styled-components";

interface BadgeWrapperProps {
  $level: number;
}

export const BadgeWrapper = styled.span<BadgeWrapperProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  justify-content: flex-start; /* 모바일: 왼쪽 정렬 */
  padding: 0;

  /* 모바일 텍스트 색상 레벨별 적용 */
  color: ${({ $level }) =>
    $level === 1 ? "#FFAF9B" :
    $level === 2 ? "#FF8D72" :
    $level === 3 ? "#FF4040" : "#FF4040"};

  @media (min-width: 768px) {
    justify-content: center; /* 데스크탑: 가운데 정렬 */
    gap: 2px;
    width: 168px;
    height: 36px;
    font-weight: 700;
    font-size: 14px;
    border-radius: 20px;
    white-space: nowrap;
    padding: 0 12px;

    /* 데스크탑: 레벨별 배경 + 흰색 텍스트 */
    background-color: ${({ $level }) =>
      $level === 1 ? "#FFAF9B" :
      $level === 2 ? "#FF8D72" :
      $level === 3 ? "#FF4040" : "transparent"};
    color: #ffffff;
  }
`;
