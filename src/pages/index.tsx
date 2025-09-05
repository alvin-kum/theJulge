import Head from "next/head";
import { useRouter } from "next/router";

import styles from "@/styles/Home.module.css";
import CustomHeader from "@/components/gnb/CustomHeader";
import CustomButton from "@/components/button/CustomButton";
import CustomCard from "@/components/card/CustomCard";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>The Julge</title>
        <meta name="description" content="더줄게 메인 페이지" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main className={styles.main}></main>
        <CustomHeader />
        <CustomButton
          size="varLarge108"
          color="primary"
          disabled={false}
          text="로그인 하기"
          handleClick={() => router.push("/login")}
        />
        <CustomButton
          size="large"
          color="secondary"
          disabled={false}
          text="로그인 하기"
          handleClick={() => router.push("/login")}
        />
        <CustomButton
          size="fill"
          color="primary"
          disabled={false}
          text="내 프로필 등록"
          handleClick={() => router.push("/profile/")}
        />
        {/* <CustomCard
          imageSrc="/sample-image.jpg"
          storeName="도토리 식당"
          date="2023-05-15T10:00:00+09:00" //rfc3339형식
          workhour={3}
          location="서울시 송파구"
          hourlyPay="15,000"
          raisePercent="50%"
          handleClick={() => {}}
        />
        <CustomCard
          imageSrc="/sample-image.jpg"
          storeName="도토리 식당"
          date="2025-09-02T10:03:00+09:00" //rfc3339형식
          workhour={3}
          location="서울시 송파구"
          hourlyPay="15,000"
          raisePercent="기존 시급보다 100%"
          handleClick={() => {}}
        /> */}
      </div>
    </>
  );
}
