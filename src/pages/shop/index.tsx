import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: #fafafa;
  padding-top: 80px;
`;

const Content = styled.div`
  max-width: 964px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px);
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  color: #6b7280;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #ea580c;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Shop() {
  const router = useRouter();

  useEffect(() => {
    const urlId = router.query.id as string | undefined;
    const savedId =
      typeof window !== "undefined" ? localStorage.getItem("myShopId") || undefined : undefined;
    const finalId = urlId || savedId;

    if (finalId) router.replace(`/shop/manage?id=${finalId}`);
    else router.replace(`/shop/register`);
  }, [router]);

  return (
    <>
      <Head>
        <title>내 가게 - THE JULGE</title>
      </Head>
      <Container>
        <Content>
          <LoadingState>
            <LoadingSpinner />
            <div>가게 관리 페이지로 이동 중...</div>
          </LoadingState>
        </Content>
      </Container>
    </>
  );
}
