"use client";

import Header from "@/components/gnb/CustomHeader";
import Footer from "@/components/footer";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"employee" | "employer" | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const type = localStorage.getItem("userType") as
      | "employee"
      | "employer"
      | null;

    if (token && type) {
      setIsLoggedIn(true);
      setUserType(type);
    } else {
      setIsLoggedIn(false);
      setUserType(null);
    }
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    setUserType(null);
    router.push("/"); // 로그아웃 후 홈으로 이동
  };

  // ✅ 사용자 유형에 따른 페이지 경로 및 이름
  const pagename = userType === "employer" ? "내 가게" : "내 프로필";
  const href = userType === "employer" ? "/shop" : "/profile";

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        href={href}
        pagename={pagename}
        handleLogoutClick={handleLogoutClick}
      />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
