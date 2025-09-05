import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import PageLayout from "@/components/layout/PageLayout";
import GlobalStyle from "@/styles/GlobalStyle";

const NO_LAYOUT = ["/login", "/signup"];

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const content = <Component {...pageProps} />;

  return (
    <>
      {/* 🔹 기본 SEO / 메타태그 */}
      <Head>
        {/* 뷰포트 */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=no"
        />

        {/* 기본 SEO */}
        <title>The Julge</title>
        <meta
          name="description"
          content="맞춤형 매칭 플랫폼으로 사람과 서비스, 기업과 인재를 빠르고 정확하게 연결합니다."
        />
        <meta
          name="keywords"
          content="매칭 플랫폼, 인재 매칭, 서비스 매칭, 파트너 찾기"
        />
        <meta name="author" content="Codeit" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Julge" />
        <meta
          property="og:description"
          content="맞춤형 매칭 플랫폼으로 사람과 서비스, 기업과 인재를 빠르고 정확하게 연결합니다."
        />
        <meta property="og:url" content="https://www.example.com" />
        <meta
          property="og:image"
          content="https://www.example.com/og-image.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Julge" />
        <meta
          name="twitter:description"
          content="맞춤형 매칭 플랫폼으로 사람과 서비스, 기업과 인재를 빠르고 정확하게 연결합니다."
        />
        <meta
          name="twitter:image"
          content="https://www.example.com/og-image.png"
        />
      </Head>

      {/* 글로벌 스타일 + 페이지 */}
      <GlobalStyle />
      {NO_LAYOUT.includes(pathname) ? (
        content
      ) : (
        <PageLayout>{content}</PageLayout>
      )}
    </>
  );
}
