import Head from "next/head";
import { useRouter } from "next/router";

export default function NoticeDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>공고 상세 - theJulge</title>
        <meta name="description" content="공고 상세 정보 페이지" />
      </Head>
      <div>
        <h1>공고 상세</h1>
        <p>공고 ID: {id}</p>
        {/* 공고 상세 정보 컴포넌트가 들어갈 예정 */}
      </div>
    </>
  );
}
