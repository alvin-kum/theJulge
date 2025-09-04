// src/styles/profile.styles.ts
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

export const Container = styled.div`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  margin-top: 70px;

  @media (max-width: 744px) {
    padding: 0 24px;
  }

  @media (max-width: 375px) {
    padding: 0 12px;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 100%;
  color: #333;
  margin: 0 0 32px 0;

  @media (max-width: 375px) {
    font-size: 20px;
    color: #111322;
    margin-bottom: 24px;
  }
`;

/* 프로필 카드 */
export const ProfileCard = styled.div<{ hasProfile?: boolean }>`
  width: 957px;
  height: 256px;
  border: 1px solid #E5E4E7;
  border-radius: 8px;
  background: ${({ hasProfile }) => (hasProfile ? "#FFEBE7" : "#fff")};
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: 1024px) {
    width: 680px;
    height: auto;
    flex-direction: column;
    padding: 24px;
  }

  @media (max-width: 375px) {
    width: 351px;
    height: auto;
    flex-direction: column;
    padding: 16px;
  }
`;

export const ProfileContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 32px;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 24px;
  }

  @media (max-width: 375px) {
    padding: 16px;
  }
`;

export const ProfileTextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const NameSection = styled.div`
  margin-bottom: 16px;
`;

export const ProfileLabel = styled.div`
  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #EA3C12;
  margin-bottom: 8px;
`;

export const ProfileName = styled.div`
  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 100%;
  color: #333;
  margin-bottom: 16px;

  @media (max-width: 375px) {
    font-size: 20px;
  }
`;

export const ContactRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const ContactIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ContactText = styled.div`
  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-size: 16px;
  line-height: 26px;
  color: #333;
`;

export const LocationRow = styled.div`
  display: flex;
  align-items: center;
`;

export const LocationIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const LocationText = styled.div`
  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-size: 16px;
  line-height: 26px;
  color: #333;
`;

export const ProfileDescription = styled.div`
  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-size: 16px;
  line-height: 26px;
  color: #333;
  margin-top: 12px;
`;

export const EditButton = styled.button`
  position: absolute;
  top: 32px;
  right: 32px;
  width: 169px;
  height: 48px;
  border: 1px solid #EA3C12;
  border-radius: 6px;
  background: #FFFFFF;
  cursor: pointer;

  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #EA3C12;

  &:hover {
    background-color: #FFF4F2;
  }

  @media (max-width: 375px) {
    top: 16px;
    right: 16px;
    width: 120px;
    height: 40px;
    font-size: 14px;
  }
`;

/* 등록 전 상태 */
export const EmptyMessage = styled.p`
  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  color: #333;
  margin-bottom: 24px;

  @media (max-width: 375px) {
    font-size: 14px;
  }
`;

export const ViewJobsButton = styled.button`
  width: 346px;
  height: 47px;
  background: #EA3C12;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-weight: 700;
  font-size: 16px;

  &:hover {
    background-color: #cc3e12;
  }

  @media (max-width: 375px) {
    width: 150px;
    height: 37px;
    font-size: 14px;
  }
`;

/* 신청 내역 */
export const ApplicationsSection = styled.div`
  max-width: 964px;
  margin: 40px auto 0;
  width: 100%;
`;

export const ApplicationsTitle = styled.h2`
  font-family: 'Spoqa Han Sans Neo', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #333;
  margin: 0 0 24px 0;

  @media (max-width: 375px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

export const ApplicationsCard = styled.div`
  width: 100%;
  border: 1px solid #E5E4E7;
  border-radius: 8px;
  background: #fff;
  padding: 32px;
  text-align: center;

  @media (max-width: 375px) {
    padding: 16px;
  }
`;

export const ApplicationsTable = styled.div`
  width: 100%;
  border: 1px solid #E5E4E7;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  background: #FFF4F2;
  padding: 16px 24px;
  border-bottom: 1px solid #E5E4E7;

  div {
    font-family: 'Spoqa Han Sans Neo', sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #333;
  }

  @media (max-width: 375px) {
    grid-template-columns: 1fr 1.5fr 0.8fr 0.8fr;
    padding: 12px 16px;

    div {
      font-size: 14px;
    }
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  padding: 16px 24px;
  border-bottom: 1px solid #E5E4E7;

  &:last-child {
    border-bottom: none;
  }

  div {
    font-family: 'Spoqa Han Sans Neo', sans-serif;
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
  }

  @media (max-width: 375px) {
    grid-template-columns: 1fr 1.5fr 0.8fr 0.8fr;
    padding: 12px 16px;

    div {
      font-size: 12px;
    }
  }
`;

export const StatusBadge = styled.span<{ status?: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;

  ${({ status }) => {
    switch (status) {
      case "승인완료":
        return `background: #CCE6FF; color: #0080FF;`;
      case "거절":
        return `background: #FFEBE7; color: #FF4040;`;
      case "대기중":
        return `background: #D4F7D4; color: #20A81E;`;
      default:
        return `background: #E8F5E8; color: #22C55E;`;
    }
  }}
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;

  span {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #666;

    &:hover {
      color: #333;
    }
  }
`;

export const PageNumber = styled.div<{ active?: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;

  ${({ active }) =>
    active
      ? `background: #FF8D72; color: white;`
      : `color: #666; &:hover { background: #F5F5F5; }`}
`;
