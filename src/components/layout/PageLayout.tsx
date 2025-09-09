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
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
