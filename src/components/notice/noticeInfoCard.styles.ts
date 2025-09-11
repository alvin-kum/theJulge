import Image from "next/image";
import styled from "styled-components";

/* ================= styled-components ================= */
export const Wrap = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  padding: 40px 0;
  width: max-content;

  @media (min-width: 768px) {
    padding: 60px 0;
  }
`;

export const HeaderBox = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

export const Category = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #ea3c12;

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

// export const ShopRow = styled.div`
//   display: flex;
//   gap: 12px;
//   align-items: center;
// `;

export const ShopName = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111322;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 28px;
    letter-spacing: 2%;
  }
`;

export const CloseNotice = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  opacity: 1;
  @media (min-width: 768px) {
    font-size: 28px;
    letter-spacing: 0.56px;
  }

  @media (min-width: 1200px) {
    font-size: 28px;
    letter-spacing: 0.56px;
  }
`;

export const InfoBox = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #e5e4e7;
  background: #ffffff;
  border-radius: 12px;

  @media (min-width: 768px) {
    gap: 16px;
    padding: 24px;
  }

  @media (min-width: 1200px) {
    gap: 30px;
    flex-direction: row;
  }
`;

export const ImageBox = styled.div`
  position: relative;
  overflow: hidden;
  width: 311px;
  height: 170px;
  background: #000;
  border-radius: 12px;

  @media (min-width: 768px) {
    width: 632px;
    height: 360px;
  }

  @media (min-width: 1200px) {
    width: 540px;
    height: 308px;
  }
`;

export const StyledImage = styled(Image)<{ $dimmed?: boolean }>`
  object-fit: cover;
  object-position: center;
  opacity: ${({ $dimmed }) => ($dimmed ? 0.3 : 1)};
`;

export const ContentBox = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  padding-top: 16px;
`;

export const Section = styled.div``;

export const HourBox = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const AddressBox = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const Label = styled.p`
  font-size: 16px;
  color: #ea3c12;
  margin: 0 0 4px 0;
  font-weight: 700;
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const ValueBig = styled.p`
  font-size: 28px;
  font-weight: 700;
  color: var(--black);
  letter-spacing: 2%;
  margin: 0;
`;

export const Subnote = styled.p`
  font-size: 16px;
  color: #7d7986;
  margin: 0;
`;

export const Note = styled.p`
  font-size: 16px;
  color: #111322;
  margin: 0;
`;

export const NoticeDescWrap = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  padding: 32px;
  background: #f2f2f3;
  border-radius: 12px;
`;

export const NoticeDescHeader = styled.h3`
  font-size: 16px;
  font-weight: 700;
  line-height: 0.2px;
`;
export const NoticeDescContent = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
`;
