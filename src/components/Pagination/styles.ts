import styled, { css } from "styled-components";

/* ---------- Wrapper ---------- */
export const PaginationWrapper = styled.div`
  display: flex;
  gap: 2px;
  justify-content: center;
  align-items: center;
`;

/* ---------- 페이지 번호 버튼 ---------- */
export const PageButton = styled.button<{ $active?: boolean }>`
  font-size: 12px;
  font-weight: 400;
  color: #000000;
  width: 32px;
  height: 32px;
  cursor: pointer;
  border: none;
  background: none;
  border-radius: 4px;

  &:hover {
    background-color: #cbc9cf;
  }

  ${({ $active }) =>
    $active &&
    css`
      background-color: #ff8d72;
      color: #ffffff;
    `}

  @media (min-width: 768px) {
      font-size: 14px;
      width: 40px;
      height: 40px;
    }  
`;

/* ---------- 이전/다음 버튼 ---------- */
export const NavButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  &:disabled {
    cursor: auto;
    opacity: 0.2;
  }
  
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }  
`;
