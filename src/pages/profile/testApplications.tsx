// src/pages/profile/test-applications.tsx
import { useRouter } from "next/router";
import CustomHeader from "@/components/gnb/CustomHeader";
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
  ApplicationsTable,
  TableHeader,
  TableRow,
  StatusBadge,
  Pagination,
  PageNumber,
} from "@/styles/profile.styles";

export default function TestApplicationsPage() {
  const router = useRouter();

  const user = {
    name: "홍길동",
    phone: "010-0000-0000",
    address: "서울시 강남구",
    bio: "안녕하세요. 홍길동입니다.",
  };

  const applications = [
    {
      id: 1,
      shop: { name: "카페 모카" },
      date: "2023-09-01",
      time: "14:00 ~ 18:00",
      wage: "12,000원",
      status: "approved",
    },
    {
      id: 2,
      shop: { name: "피자나라 치킨공주" },
      date: "2023-09-03",
      time: "10:00 ~ 15:00",
      wage: "13,000원",
      status: "pending",
    },
    {
      id: 3,
      shop: { name: "분식천국" },
      date: "2023-09-05",
      time: "12:00 ~ 17:00",
      wage: "12,500원",
      status: "rejected",
    },
  ];

  return (
    <Wrapper>
      <CustomHeader />

      <Container>
        <ProfileSection>
          <Title>내 프로필</Title>

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
                    <LocationText>{user.address}</LocationText>
                  </LocationRow>
                </NameSection>

                <ProfileDescription>
                  {user.bio}
                </ProfileDescription>
              </ProfileTextArea>

              <EditButton onClick={() => router.push("/profile/edit")}>편집하기</EditButton>
            </ProfileContent>
          </ProfileCard>

          <ApplicationsSection>
            <ApplicationsTitle>신청 내역</ApplicationsTitle>

            <ApplicationsTable>
              <TableHeader>
                <div>가게</div>
                <div>일시</div>
                <div>시급</div>
                <div>상태</div>
              </TableHeader>

              {applications.map((app) => (
                <TableRow key={app.id}>
                  <div>{app.shop.name}</div>
                  <div>{app.date} {app.time}</div>
                  <div>{app.wage}</div>
                  <div>
                    <StatusBadge status={
                      app.status === "approved"
                        ? "승인완료"
                        : app.status === "pending"
                        ? "대기중"
                        : "거절"
                    }>
                      {app.status === "approved"
                        ? "승인완료"
                        : app.status === "pending"
                        ? "대기중"
                        : "거절"}
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
              <span>›</span>
            </Pagination>
          </ApplicationsSection>
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
