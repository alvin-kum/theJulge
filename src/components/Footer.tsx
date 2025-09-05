import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 40px 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Logo = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #ea580c;
  margin: 0;
`;

const Copyright = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 60px;
  
  @media (max-width: 768px) {
    gap: 40px;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LinkTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
`;

const Link = styled.a`
  font-size: 14px;
  color: #6b7280;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    color: #ea580c;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  background: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  text-decoration: none;
  font-size: 18px;
  
  &:hover {
    background: #ea580c;
    color: white;
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>
          <Logo>THE JULGE</Logo>
          <Copyright>©codeit - 2023</Copyright>
        </FooterLogo>
        
        <FooterLinks>
          <LinkGroup>
            <LinkTitle>서비스</LinkTitle>
            <Link href="/notices">공고보기</Link>
            <Link href="/shop">내 가게</Link>
            <Link href="/profile">내 프로필</Link>
          </LinkGroup>
          
          <LinkGroup>
            <LinkTitle>정보</LinkTitle>
            <Link>Privacy Policy</Link>
            <Link>FAQ</Link>
            <Link>고객센터</Link>
          </LinkGroup>
        </FooterLinks>
        
        <SocialLinks>
          <SocialIcon href="#" aria-label="이메일">
            ✉
          </SocialIcon>
          <SocialIcon href="#" aria-label="페이스북">
            f
          </SocialIcon>
          <SocialIcon href="#" aria-label="인스타그램">
            📷
          </SocialIcon>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
}