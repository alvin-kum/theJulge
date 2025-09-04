import Head from "next/head";
import { useState, useEffect } from 'react';
import { apiClient } from "@/lib/api/client";

export default function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await apiClient.get('/users/me');
        setUserProfile(profile);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Head>
        <title>내 프로필 - theJulge</title>
        <meta name="description" content="알바 프로필 상세 페이지" />
      </Head>
      <div>
        <h1>내 프로필</h1>
        {loading ? (
          <div>로딩 중...</div>
        ) : (
          <div>
            <p>이름: {userProfile?.item?.name || '사용자'}</p>
            <p>전화번호: {userProfile?.item?.phone || '-'}</p>
            <p>주소: {userProfile?.item?.address || '-'}</p>
          </div>
        )}
      </div>
    </>
  );
}
