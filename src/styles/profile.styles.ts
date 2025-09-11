// styles/profile.styles.ts
import styled from "styled-components";
import { typography } from "@/styles/typography";

/** 전체 레이아웃 */
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  min-height: 100vh;
`;

export const Container = styled.div`
  max-width: 964px;
  width: 100%;
  margin: 60px auto 0;
  padding: 0 16px;

  @media (max-width: 744px) {
    padding: 0 24px;
  }

  @media (max-width: 375px) {
    padding: 0 12px;
  }
`;

export const Title = styled.h1`
  ${typography.h1};
  color: #111322;
  margin-bottom: 32px;

  @media (max-width: 375px) {
    font-size: 20px;
    margin-bottom: 24px;
  }
`;



/** 프로필 카드 영역 */
export const ProfileCard = styled.div<{ hasProfile?: boolean }>`
  background: ${({ hasProfile }) => (hasProfile ? "#FFEBE7" : "#ffffff")};
  border: 1px solid #e5e4e7;
  border-radius: 12px;
  padding: ${({ hasProfile }) => (hasProfile ? "32px" : "60px 20px")};
  display: flex;
  flex-direction: ${({ hasProfile }) => (hasProfile ? "row" : "column")};
  align-items: ${({ hasProfile }) => (hasProfile ? "flex-start" : "center")};
  justify-content: ${({ hasProfile }) => (hasProfile ? "space-between" : "center")};
  text-align: ${({ hasProfile }) => (hasProfile ? "left" : "center")};
  gap: 24px;
  margin-bottom: 40px;
  position: relative;

  @media (max-width: 744px) {
    flex-direction: column;
    padding: ${({ hasProfile }) => (hasProfile ? "24px" : "32px 16px")};
  }

  @media (max-width: 375px) {
    padding: ${({ hasProfile }) => (hasProfile ? "20px" : "24px 12px")};
    border-radius: 10px;
  }
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ProfileTextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const NameSection = styled.div`
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ProfileLabel = styled.div`
  ${typography.body1Bold}
  color: #EA3C12;
`;

export const ProfileName = styled.div`
  ${typography.h1}  
  color: #111322;
`;

export const ContactRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ContactIcon = styled.div`
  width: 16px;
  height: 16px;
`;

export const ContactText = styled.div`
  ${typography.body1Regular}
  color: #7D7986;
`;

export const LocationRow = styled(ContactRow)``;
export const LocationIcon = styled(ContactIcon)``;
export const LocationText = styled(ContactText)``;

export const ProfileSection = styled(ContactText)``;

export const ProfileDescription = styled.div`
 ${typography.body1Regular};
 color : #000000;
`;

export const EditButton = styled.button<{ isNew?: boolean }>`
  height: 48px;
  padding: 10px 20px;
  ${typography.body1Regular};
  border-radius: 6px;
  cursor: pointer;
  border: ${({ isNew }) => (isNew ? "none" : "1px solid #EA3C12")};
  background-color: ${({ isNew }) => (isNew ? "#EA3C12" : "#FFFFFF")};
  color: ${({ isNew }) => (isNew ? "#FFFFFF" : "#EA3C12")};

  &:hover {
    background-color: ${({ isNew }) => (isNew ? "#d5380f" : "#fff4f2")};
  }

  ${({ isNew }) =>
    !isNew &&
    `
    position: absolute;
    top: 32px;
    right: 32px;
  `}

  @media (max-width: 375px) {
    font-size: 13px;
    height: 36px;
    padding: 8px 16px;
  }
`;

/** 프로필 미등록 메시지 재사용 */
export const EmptyMessage = styled.p`
  font-size: 14px;
  color: #111322;
  margin-bottom: 16px;

  @media (max-width: 375px) {
    font-size: 13px;
  }
`;

export const RegisterButton = styled.button`
  height: 37px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 700;
  background: #EA3C12;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #d5380f;
  }
`;


/** 신청 내역 영역 */
export const ApplicationsSection = styled.div`
  width: 100%;
  margin-top: 40px;
`;

export const ApplicationsTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111322;
  margin-bottom: 16px;
`;
