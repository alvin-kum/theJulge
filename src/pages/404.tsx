import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  padding: 20px;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  font-weight: 700;
  color: #ea3c3c;
  margin: 0;
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #111827;
  margin: 16px 0;
`;

const ErrorDescription = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  text-align: center;
  margin-bottom: 32px;
  max-width: 500px;
`;

const HomeButton = styled.button`
  background: #ea3c3c;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
  }
`;

export default function Custom404() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 - 페이지를 찾을 수 없습니다 | THE JULGE</title>
        <meta name="description" content="요청하신 페이지를 찾을 수 없습니다." />
      </Head>
      <Container>
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>페이지를 찾을 수 없습니다</ErrorTitle>
        <ErrorDescription>
          요청하신 페이지가 존재하지 않거나, 이동되었거나, 삭제되었을 수 있습니다.
          홈페이지로 돌아가서 다시 시도해보세요.
        </ErrorDescription>
        <HomeButton onClick={() => router.push('/')}>
          홈으로 돌아가기
        </HomeButton>
      </Container>
    </>
  );
}
