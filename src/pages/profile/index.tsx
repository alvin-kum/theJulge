import { useRouteGuard } from "@/hooks/useRouteGuard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CustomHeader from "../../components/gnb/CustomHeader";
import {
  Wrapper,
  Container,
  ProfileSection,
  Title,
  ProfileCard,
  ProfileContent,
  ProfileTextArea,
  NameSection,
  ProfileLabel,
  ProfileName,
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
  ApplicationsCard,
  EmptyMessage,
  ViewJobsButton,
  ApplicationsTable,
  TableHeader,
  TableRow,
  StatusBadge,
  Pagination,
  PageNumber,
} from "../../styles/profile.styles";
import { fetchMyInfo, fetchMyApplications } from "../../lib/api/user";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    Promise.all([
      fetchMyInfo(userId), // GET /users/{user_id}
      fetchMyApplications(userId), // GET /users/{user_id}/applications
    ])
      .then(([u, apps]) => {
        setUser(u);
        setApplications(apps || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !user) {
    return <p style={{ textAlign: "center" }}>내 정보를 불러오는 중...</p>;
  }

  // 이름 + 연락처가 있으면 "등록 완료"로 간주
  const hasProfile = Boolean(user?.name && user?.phone);

  return (
    <Wrapper>
      <CustomHeader />

      <Container>
        <ProfileSection>
          <Title>내 프로필</Title>

          {/* ✅ 등록 전: 프로필 등록 카드만 */}
          {!hasProfile ? (
            <ProfileCard>
              <EmptyMessage>
                내 프로필을 등록하고 원하는 가게에 지원해 보세요.
              </EmptyMessage>
              <ViewJobsButton onClick={() => router.push("/profile/edit")}>
                내 프로필 등록하기
              </ViewJobsButton>
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

                  <EditButton onClick={() => router.push("/profile/edit")}>
                    편집하기
                  </EditButton>
                </ProfileContent>
              </ProfileCard>

              {/* ✅ 신청 내역은 프로필 등록된 경우만 표시 */}
              <ApplicationsSection>
                <ApplicationsTitle>신청 내역</ApplicationsTitle>

                {applications.length === 0 ? (
                  <ApplicationsCard>
                    <EmptyMessage>아직 신청 내역이 없어요.</EmptyMessage>
                    <ViewJobsButton
                      onClick={() => router.push("/profile/testApplications")}
                    >
                      공고 보러가기
                    </ViewJobsButton>
                  </ApplicationsCard>
                ) : (
                  <>
                    <ApplicationsTable>
                      <TableHeader>
                        <div>가게</div>
                        <div>일시</div>
                        <div>시급</div>
                        <div>상태</div>
                      </TableHeader>

                      {applications.map((app: any, index: number) => (
                        <TableRow key={app.id || index}>
                          <div>{app.shop?.name || "HS 과일주스"}</div>
                          <div>2023-01-12 10:00 ~ 12:00 (2시간)</div>
                          <div>15,000원</div>
                          <div>
                            <StatusBadge status={app.status || "승인완료"}>
                              {app.status === "approved"
                                ? "승인완료"
                                : app.status === "rejected"
                                ? "거절"
                                : app.status === "pending"
                                ? "대기"
                                : "승인완료"}
                            </StatusBadge>
                          </div>
                        </TableRow>
                      ))}
                    </ApplicationsTable>

                    <Pagination>
                      <span>‹</span>
                      <PageNumber active>1</PageNumber>
                      <PageNumber>2</PageNumber>
                      <PageNumber>3</PageNumber>
                      <PageNumber>4</PageNumber>
                      <PageNumber>5</PageNumber>
                      <PageNumber>6</PageNumber>
                      <PageNumber>7</PageNumber>
                      <span>›</span>
                    </Pagination>
                  </>
                )}
              </ApplicationsSection>
            </>
          )}
        </ProfileSection>
      </Container>

      <footer
        style={{
          marginTop: 40,
          textAlign: "center",
          color: "#999",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ⓒcodeit - 2023 | Privacy Policy | FAQ
      </footer>
    </Wrapper>
  );
}
