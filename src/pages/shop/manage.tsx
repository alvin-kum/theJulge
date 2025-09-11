import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import { apiClient, ApiError } from "@/lib/api/client";

const Container = styled.div`
  min-height: 100vh;
  background: #fff;
`;

const Content = styled.div`
  max-width: 964px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const ShopName = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
`;

const ShopInfo = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 24px 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #9ca3af;
    background: #f9fafb;
  }
`;

const PrimaryActionButton = styled(ActionButton)`
  background: #ea580c;
  color: white;
  border-color: #ea580c;

  &:hover {
    background: #dc2626;
    border-color: #dc2626;
  }
`;

const TabSection = styled.div`
  margin-bottom: 32px;
`;

const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  color: ${(props) => (props.active ? "#ea580c" : "#6b7280")};
  border-bottom: 2px solid
    ${(props) => (props.active ? "#ea580c" : "transparent")};
  transition: all 0.2s;

  &:hover {
    color: #ea580c;
  }
`;

const NoticeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const NoticeCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const NoticeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: #f3f4f6;
`;

const NoticeContent = styled.div`
  padding: 20px;
`;

const NoticeTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
`;

const NoticeDetails = styled.div`
  margin-bottom: 16px;
`;

const NoticeDetail = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 4px 0;
`;

const NoticeFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
`;

const HourlyPay = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

const PayIncrease = styled.span`
  background: #fef2f2;
  color: #dc2626;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 20px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #ea580c;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #374151;
`;

const LoadingSubText = styled.div`
  font-size: 14px;
  color: #6b7280;
`;
// 카드형 헤더 추가
const ShopCard = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 20px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  background: #fff7ed;
  align-items: center;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const ShopCover = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
`;
const ShopMeta = styled.div`
  display: grid;
  gap: 10px;
`;
const ShopCategory = styled.span`
  display: inline-block;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #f59e0b;
  color: #b45309;
  font-weight: 700;
  width: fit-content;
`;
const ShopDesc = styled.p`
  font-size: 14px;
  color: #374151;
  margin: 4px 0 0;
  line-height: 1.5;
`;


interface Notice {
  id: string;
  title: string;
  imageUrl: string;
  startsAt: string;
  workhour: number;
  description: string;
  hourlyPay: number;
  originalHourlyPay: number;
  closed: boolean;
}

interface Shop {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export default function ShopManage() {
  const router = useRouter();
  const [shopData, setShopData] = useState<Shop | null>(null);
  const [activeTab, setActiveTab] = useState("등록한 공고");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [shopId, setShopId] = useState<string | null>(null);

  useEffect(() => {
    const getShopId = async () => {
      try {
        const urlShopId = router.query.id as string;

        if (urlShopId) {
          console.log("URL에서 shop ID 가져옴:", urlShopId);
          setShopId(urlShopId);
          localStorage.setItem("myShopId", urlShopId);
        } else {
          console.log("/shops/my API 호출 시작");
          // URL에 id가 없을 때: localStorage에서 복구 시도 → 없으면 /shop으로
          const savedId =
          typeof window !== "undefined"
            ? localStorage.getItem("myShopId") || undefined
            : undefined;

          if (savedId) {
          console.log("localStorage에서 shop ID 복구:", savedId);
          setShopId(savedId);
          } else {
          console.log("URL/로컬 모두 shopId 없음 → /shop으로 이동");
          router.replace("/shop");
          return;
          }
        }
      } catch (error) {
        console.error("가게 ID 확인 실패:", error);
        alert("가게 정보 확인 중 오류가 발생했습니다.");
        router.replace("/shop");
      }
    };

    if (router.isReady) {
      console.log("Router 준비됨, getShopId 실행");
      getShopId();
    }
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    if (!shopId) {
      console.log("shopId가 없어서 데이터 로딩 건너뜀");
      return;
    }

    console.log("shopId로 데이터 로딩 시작:", shopId);

    const fetchData = async () => {
      try {
        setLoading(true);

        console.log(`/shops/${shopId} API 호출`);
        const shopResponse = await apiClient.get(`/shops/${shopId}`);
        console.log("가게 정보 응답:", shopResponse);
        setShopData(shopResponse.item);

        try {
          console.log(`/shops/${shopId}/notices API 호출`);
          const noticeResponse = await apiClient.get(
            `/shops/${shopId}/notices`
          );
          console.log("공고 목록 응답:", noticeResponse);
          setNotices(noticeResponse.items || []);
        } catch (noticeError) {
          console.error("가게 공고 목록 가져오기 실패:", noticeError);
          try {
            console.log("전체 공고 목록으로 대체 시도");
            const allNoticesResponse = await apiClient.get("/notices");
            const filteredNotices = (allNoticesResponse.items || []).filter(
              (notice: any) => notice.shop?.id === shopId
            );
            console.log("필터링된 공고 목록:", filteredNotices);
            setNotices(filteredNotices);
          } catch (allNoticesError) {
            console.error("전체 공고 목록 가져오기도 실패:", allNoticesError);
            setNotices([]);
          }
        }
      } catch (error) {
        console.error("가게 정보 가져오기 실패:", error);
        alert("가게 정보를 불러올 수 없습니다.");
        router.replace("/shop");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId, router]);

  const handleEditShop = () => {
    router.push(`/shop/edit?id=${shopId}`);
  };

  const handleCreateNotice = () => {
    router.push(`/shop/createnotice?shopId=${shopId}`);
  };

  const handleNoticeClick = (noticeId: string) => {
    if (!shopId) return;
    router.push(`/notice/${shopId}/notices/${noticeId}`);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${month}월 ${day}일 ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const calculateRaisePercent = (currentPay: number, originalPay: number) => {
    if (!currentPay || !originalPay || originalPay === 0) return "0%";
    const increase = ((currentPay - originalPay) / originalPay) * 100;
    return `${Math.round(increase)}%`;
  };

  const formatHourlyPay = (pay: number | undefined | null) => {
    if (!pay || typeof pay !== "number") return "0";
    return pay.toLocaleString();
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>가게 관리 - THE JULGE</title>
        </Head>
        <Container>
          <Content>
            <LoadingState>
              <LoadingSpinner />
              <LoadingText>가게 정보 확인 중</LoadingText>
              <LoadingSubText>잠시만 기다려주세요</LoadingSubText>
            </LoadingState>
          </Content>
        </Container>
      </>
    );
  }

  if (!shopData) {
    return (
      <>
        <Head>
          <title>가게 관리 - THE JULGE</title>
        </Head>
        <Container>
          <Content>
            <EmptyState>
              가게 정보를 불러올 수 없습니다.
              <div style={{ marginTop: "16px" }}>
                <button onClick={() => router.push("/shop")}>돌아가기</button>
              </div>
            </EmptyState>
          </Content>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{shopData.name} 관리 - THE JULGE</title>
        <meta name="description" content="가게 정보 및 공고를 관리하세요" />
      </Head>
      <Container>
        <Content>
          <Header>
          <ShopCard>
            <ShopCover
              src={shopData.imageUrl || "/placeholder-image.jpg"}
              alt={shopData.name || "가게 이미지"}
              onError={(e) => { (e.target as HTMLImageElement).style.backgroundColor = "#f3f4f6"; }}
            />
              <ShopMeta>
                <ShopCategory>{shopData.category || "업종"}</ShopCategory>
                <ShopName>{shopData.name}</ShopName>
                <ShopInfo>📍 {shopData.address1} {shopData.address2}</ShopInfo>
                {shopData.description ? <ShopDesc>{shopData.description}</ShopDesc> : null}
                <ActionButtons>
                  <ActionButton onClick={handleEditShop}>편집하기</ActionButton>
                  <PrimaryActionButton onClick={handleCreateNotice}>공고 등록하기</PrimaryActionButton>
                </ActionButtons>
              </ShopMeta>
            </ShopCard>
          </Header>

          <TabSection>
            <TabList>
              <Tab
                active={activeTab === "등록한 공고"}
                onClick={() => setActiveTab("등록한 공고")}
              >
                등록한 공고
              </Tab>
            </TabList>

            {activeTab === "등록한 공고" && (
              <div>
                {notices.length > 0 ? (
                  <NoticeGrid>
                    {notices.map((notice) => (
                      <NoticeCard
                      key={`notice-${notice.id}`}
                      onClick={() => handleNoticeClick(notice.id)}
                      > 
                        <NoticeImage
                          src={notice.imageUrl || "/placeholder-image.jpg"}
                          alt={notice.title || "공고 이미지"}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.backgroundColor = "#f3f4f6";
                            target.style.display = "flex";
                            target.style.alignItems = "center";
                            target.style.justifyContent = "center";
                            target.style.color = "#6b7280";
                            target.style.fontSize = "14px";
                            target.alt = "이미지 없음";
                          }}
                        />
                        <NoticeContent>
                          <NoticeTitle>
                            {notice.title || "제목 없음"}
                          </NoticeTitle>
                          <NoticeDetails>
                            <NoticeDetail>
                              {formatDate(notice.startsAt)} (
                              {notice.workhour || 0}시간)
                            </NoticeDetail>
                            <NoticeDetail>
                              {notice.description || "설명 없음"}
                            </NoticeDetail>
                          </NoticeDetails>
                          <NoticeFooter>
                            <HourlyPay>
                              {formatHourlyPay(notice.hourlyPay)}원
                            </HourlyPay>
                            <PayIncrease>
                              {calculateRaisePercent(
                                notice.hourlyPay,
                                notice.originalHourlyPay
                              )}
                              ↑
                            </PayIncrease>
                          </NoticeFooter>
                        </NoticeContent>
                      </NoticeCard>
                    ))}
                  </NoticeGrid>
                ) : (
                  <EmptyState>
                    <p>등록한 공고가 없습니다.</p>
                    <PrimaryActionButton
                      onClick={handleCreateNotice}
                      style={{ marginTop: "16px" }}
                    >
                      첫 공고 등록하기
                    </PrimaryActionButton>
                  </EmptyState>
                )}
              </div>
            )}

          </TabSection>
        </Content>
      </Container>
    </>
  );
}
