import Header from "@/components/gnb/CustomHeader";
import Footer from "@/components/footer";
import styled from "styled-components";

const Main = styled.main`
  min-height: calc(100dvh - 120px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
`;

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header
        isLoggedIn={true} // 로그인 상태
        href="/mystore"   // 이동할 페이지 경로
        pagename="내 가게" // 버튼에 표시될 이름
        handleLogoutClick={() => {
          console.log("로그아웃 처리"); 
          // 실제 로그아웃 로직도 여기에
        }}
      />
      <Main>{children}</Main>
    </>
  );
}
