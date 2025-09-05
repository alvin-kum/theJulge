import styled, { css } from "styled-components";

/* ---------- 카드 전체 ---------- */
export const PostCard = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 170px;
  height: 260px;
  border: 1px solid #E5E4E7;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  padding: 12px;
  gap: 12px;

  @media (min-width: 768px) {
      height: 348px;
      padding: 16px;
      gap: 16px;
    }
`;

/* ---------- 이미지 ---------- */
export const PostImage = styled.img`
  width: 100%;
  height: 84px;
  border-radius: 12px;
  object-fit: cover;

  @media (min-width: 768px) {
    height: 160px;
    }
`;

/* ---------- 내용 ---------- */
export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PostName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: #111322;

  @media (min-width: 768px) {
      font-size: 20px;
      line-height: 100%;
    }
`;

/* ---------- 상세 그룹 (이름 + 시간 + 위치) ---------- */
export const PostDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

/* ---------- 정보 ---------- */
export const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  img {
    width: 20px;
    height: 20px;
  }

  font-size: 12px;
  line-height: 16px;
  color: #7d7986;

  @media (min-width: 768px) {
      align-items: center;
      gap: 6px;
      font-size: 14px;
      line-height: 22px;
    }
`;

/* ---------- 시급 + 뱃지 ---------- */
export const PostWageWrapper = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  gap: 2px; 
  margin-top: 8px;

  @media (min-width: 768px) {
      flex-direction: row; 
      align-items: center; /* 수직 가운데 정렬 */
      gap: 8px;
      width: 100%;
      justify-content: space-between;
  }
`;

export const Wage = styled.span`
  font-size: 18px;
  font-weight: 700;
  line-height: 100%;
  color: #111322;

  @media (min-width: 768px) {
      font-size: 24px;
      font-weight: 700;
    }
`;

