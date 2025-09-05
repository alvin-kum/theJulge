// src/pages/_app.tsx
import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";
import PageLayout from "@/components/layout/PageLayout";
import GlobalStyle from "@/styles/GlobalStyle";
import { queryClient } from "@/store/queryClient";

const NO_LAYOUT = ["/login", "/register"];

export default function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const content = <Component {...pageProps} />;

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      {NO_LAYOUT.includes(pathname) ? (
        content
      ) : (
        <PageLayout>{content}</PageLayout>
      )}
    </QueryClientProvider>
  );
}
