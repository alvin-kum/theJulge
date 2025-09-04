import { useRouter } from "next/router";
import styled from "styled-components";

const Nav = styled.nav`
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 0;
  position: fixed;  /* sticky → fixed로 변경 */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;    /* z-index 높임 */
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #ea3c3c;
  cursor: pointer;
  letter-spacing: -0.5px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;

const NavLink = styled.div`
  color: #374151;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 0;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: #ea3c3c;
  }
`;

const LoginButton = styled.div`
  border: 1px solid #d1d5db;
  color: #374151;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ea3c3c;
    color: #ea3c3c;
  }
`;

export default function NavBar() {
  const router = useRouter();

  return (
    <Nav>
      <Container>
        <Logo onClick={() => router.push('/')}>
          THE JULGE
        </Logo>
        
        <NavLinks>
          <NavLink onClick={() => router.push('/notice')}>
            공고보기
          </NavLink>
          <NavLink onClick={() => router.push('/profile')}>
            내 프로필
          </NavLink>
          <LoginButton onClick={() => router.push('/login')}>
            로그인
          </LoginButton>
        </NavLinks>
      </Container>
    </Nav>
  );
}
