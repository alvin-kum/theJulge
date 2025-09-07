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

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 84px;
  border-radius: 12px;
  overflow: hidden;

  @media (min-width: 768px) {
      height: 160px;
    }
`;

export const ClosedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: #000000b2;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  color: #CBC9CF;

  @media (min-width: 768px) {
      font-size: 28px;
    }
`;

/* ---------- 내용 ---------- */
export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PostName = styled.h3<{ $isClosed: boolean }>`
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: ${({ $isClosed }) => ($isClosed ? "#CBC9CF" : "#111322")};

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

  @media (min-width: 768px) {
      font-size: 14px;
      line-height: 22px;
    }
`;

export const InfoText = styled.span<{ $isClosed: boolean }>`
  color: ${({ $isClosed }) => ($isClosed ? "#CBC9CF" : "#7d7986")};
  font-size: 12px;
  line-height: 16px;

  @media (min-width: 768px) {
      font-size: 14px;
      line-height: 22px;
    }
`;

/* ---------- 시급 + 뱃지 ---------- */
export const PostHourlyPayWrapper = styled.div`
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

export const HourlyPay = styled.span<{ $isClosed: boolean }>`
  font-size: 18px;
  font-weight: 700;
  line-height: 100%;
  color: ${({ $isClosed }) => ($isClosed ? "#CBC9CF" : "#111322")};

  @media (min-width: 768px) {
      font-size: 24px;
      font-weight: 700;
    }
`;

