import styled from "styled-components";

export const RecentWrap = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  padding: 40px 0 40px;

  @media (min-width: 768px) {
    padding: 60px 0;
  }

  @media (min-width: 1200px) {
    padding: 60px 0 12px;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111322;
`;
