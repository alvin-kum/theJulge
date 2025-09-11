import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Wrapper,
  Container,
  ProfileSection,
  Title,
  ProfileCard,
  ProfileContent,
  ProfileTextArea,
  NameSection,
  ProfileName,
  ProfileLabel,
  ContactRow,
  ContactIcon,
  ContactText,
  LocationRow,
  LocationIcon,
  LocationText,
  ProfileDescription,
  EditButton,
  ApplicationsSection,
  ApplicationsTitle,
} from "./profile.styles";
import { fetchMyInfo } from "../../lib/api/user";

import ApplicationList from "@/components/Application"; 

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      router.replace("/login");
      return;
    }

    fetchMyInfo(userId)
      .then((u) => setUser(u))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !user) {
    return <p style={{ textAlign: "center" }}>내 정보를 불러오는 중...</p>;
  }

  // 이름 + 연락처가 있으면 "등록 완료"로 간주
  const hasProfile = Boolean(user?.name && user?.phone);

  return (
    <Wrapper>
      <Container>
        <ProfileSection>
          <Title>내 프로필</Title>

          {/* ✅ 등록 전: 프로필 등록 카드만 */}
          {!hasProfile ? (
            <ProfileCard>
              <ProfileContent>
                <ProfileTextArea>
                  <NameSection>
                    <ProfileDescription>
                      내 프로필을 등록하고 원하는 가게에 지원해 보세요.
                    </ProfileDescription>
                  </NameSection>
                </ProfileTextArea>
                <EditButton isNew onClick={() => router.push("/profile/edit")}>
                  내 프로필 등록하기
                </EditButton>
              </ProfileContent>
            </ProfileCard>
          ) : (
            <>
              {/* ✅ 등록된 프로필 카드 */}
              <ProfileCard hasProfile>
                <ProfileContent>
                  <ProfileTextArea>
                    <NameSection>
                      <ProfileLabel>이름</ProfileLabel>
                      <ProfileName>{user.name}</ProfileName>

                      <ContactRow>
                        <ContactIcon>
                          <img src="/icon/phone.svg" alt="phone" />
                        </ContactIcon>
                        <ContactText>{user.phone}</ContactText>
                      </ContactRow>

                      <LocationRow>
                        <LocationIcon>
                          <img src="/icon/location.svg" alt="location" />
                        </LocationIcon>
                        <LocationText>
                          {user.address || "선호 지역 미등록"}
                        </LocationText>
                      </LocationRow>
                    </NameSection>

                    <ProfileDescription>
                      {user.bio || "자기소개가 아직 등록되지 않았습니다."}
                    </ProfileDescription>
                  </ProfileTextArea>

                  
                </ProfileContent>

                <EditButton onClick={() => router.push("/profile/edit")}>
                    편집하기
                </EditButton>
              </ProfileCard>

              {/* ✅ 신청 내역: 항상 ApplicationList만 렌더 (빈/로딩/데이터는 내부에서 처리) */}
              <ApplicationsSection>
                <ApplicationsTitle>신청 내역</ApplicationsTitle>
                <ApplicationList userId={user.id} />
              </ApplicationsSection>
            </>
          )}
        </ProfileSection>
      </Container>
    </Wrapper>
  );
}
