import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import NavBar from "@/components/NavBar";
import { apiClient } from '@/lib/api/client';

const Container = styled.div`
  min-height: 100vh;
  background: #fafafa;
  padding-top: 80px;
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
  color: ${props => props.active ? '#ea580c' : '#6b7280'};
  border-bottom: 2px solid ${props => props.active ? '#ea580c' : 'transparent'};
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
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
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
  const [activeTab, setActiveTab] = useState('등록한 공고');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [shopId, setShopId] = useState<string | null>(null);

  useEffect(() => {
    const getShopId = async () => {
      try {
        // URL에서 shop ID 가져오기
        const urlShopId = router.query.id as string;
        
        if (urlShopId) {
          setShopId(urlShopId);
        } else {
          // URL에 ID가 없으면 안전한 API 호출로 내 가게 확인
          const { data: response, error: apiError } = await apiClient.safeGet('/shops/my', 1);
          
          if (apiError) {
            console.error('내 가게 정보 확인 실패:', apiError);
            router.replace('/shop');
            return;
          }
          
          if (response?.item && response.item.id) {
            setShopId(response.item.id);
          } else {
            router.replace('/shop');
            return;
          }
        }
      } catch (error) {
        console.error('가게 ID 확인 실패:', error);
        router.replace('/shop');
      }
    };

    if (router.isReady) {
      getShopId();
    }
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    if (!shopId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 가게 정보 가져오기
        const shopResponse = await apiClient.get(`/shops/${shopId}`);
        setShopData(shopResponse.item);
        
        // 가게의 공고 목록 가져오기
        try {
          const noticeResponse = await apiClient.get(`/shops/${shopId}/notices`);
          setNotices(noticeResponse.items || []);
        } catch (noticeError) {
          console.error('가게 공고 목록 가져오기 실패:', noticeError);
          // 가게별 공고 API가 없으면 전체 공고에서 필터링
          try {
            const allNoticesResponse = await apiClient.get('/notices');
            const filteredNotices = (allNoticesResponse.items || []).filter(
              (notice: any) => notice.shop?.id === shopId
            );
            setNotices(filteredNotices);
          } catch (allNoticesError) {
            console.error('전체 공고 목록 가져오기도 실패:', allNoticesError);
            setNotices([]);
          }
        }
      } catch (error) {
        console.error('가게 정보 가져오기 실패:', error);
        // 가게 정보를 가져올 수 없으면 shop 페이지로 리다이렉트
        router.replace('/shop');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId]);

  const handleEditShop = () => {
    router.push(`/shop/edit?id=${shopId}`);
  };

  const handleCreateNotice = () => {
    router.push(`/notice/create?shopId=${shopId}`);
  };

  const handleNoticeClick = (noticeId: string) => {
    router.push(`/notice/${noticeId}`);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    return `${month}월 ${day}일 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const calculateRaisePercent = (currentPay: number, originalPay: number) => {
    if (!currentPay || !originalPay || originalPay === 0) return '0%';
    const increase = ((currentPay - originalPay) / originalPay) * 100;
    return `${Math.round(increase)}%`;
  };

  const formatHourlyPay = (pay: number | undefined | null) => {
    if (!pay || typeof pay !== 'number') return '0';
    return pay.toLocaleString();
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <Container>
          <Content>
            <LoadingState>가게 정보를 확인하고 있습니다...</LoadingState>
          </Content>
        </Container>
      </>
    );
  }

  if (!shopData) {
    return (
      <>
        <NavBar />
        <Container>
          <Content>
            <EmptyState>가게 정보를 불러올 수 없습니다.</EmptyState>
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
      <NavBar />
      <Container>
        <Content>
          <Header>
            <ShopName>{shopData.name}</ShopName>
            <ShopInfo>
              📍 {shopData.address1} {shopData.address2} | 
              🏷️ {shopData.category} | 
              🕐 기본 시급 {formatHourlyPay(shopData.originalHourlyPay)}원
            </ShopInfo>
            <ActionButtons>
              <ActionButton onClick={handleEditShop}>
                가게 정보 편집
              </ActionButton>
              <PrimaryActionButton onClick={handleCreateNotice}>
                공고 등록하기
              </PrimaryActionButton>
            </ActionButtons>
          </Header>

          <TabSection>
            <TabList>
              <Tab 
                active={activeTab === '등록한 공고'} 
                onClick={() => setActiveTab('등록한 공고')}
              >
                등록한 공고
              </Tab>
              <Tab 
                active={activeTab === '지원 현황'} 
                onClick={() => setActiveTab('지원 현황')}
              >
                지원 현황
              </Tab>
            </TabList>

            {activeTab === '등록한 공고' && (
              <div>
                {notices.length > 0 ? (
                  <NoticeGrid>
                    {notices.map((notice) => (
                      <NoticeCard 
                        key={notice.id}
                        onClick={() => handleNoticeClick(notice.id)}
                      >
                        <NoticeImage 
                          src={notice.imageUrl || '/placeholder-image.jpg'} 
                          alt={notice.title || '공고 이미지'}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.backgroundColor = '#f3f4f6';
                            target.style.display = 'flex';
                            target.style.alignItems = 'center';
                            target.style.justifyContent = 'center';
                            target.style.color = '#6b7280';
                            target.style.fontSize = '14px';
                            target.alt = '이미지 없음';
                          }}
                        />
                        <NoticeContent>
                          <NoticeTitle>{notice.title || '제목 없음'}</NoticeTitle>
                          <NoticeDetails>
                            <NoticeDetail>
                              {formatDate(notice.startsAt)} ({notice.workhour || 0}시간)
                            </NoticeDetail>
                            <NoticeDetail>{notice.description || '설명 없음'}</NoticeDetail>
                          </NoticeDetails>
                          <NoticeFooter>
                            <HourlyPay>{formatHourlyPay(notice.hourlyPay)}원</HourlyPay>
                            <PayIncrease>
                              {calculateRaisePercent(notice.hourlyPay, notice.originalHourlyPay)}↑
                            </PayIncrease>
                          </NoticeFooter>
                        </NoticeContent>
                      </NoticeCard>
                    ))}
                  </NoticeGrid>
                ) : (
                  <EmptyState>
                    <p>등록한 공고가 없습니다.</p>
                    <PrimaryActionButton onClick={handleCreateNotice} style={{ marginTop: '16px' }}>
                      첫 공고 등록하기
                    </PrimaryActionButton>
                  </EmptyState>
                )}
              </div>
            )}

            {activeTab === '지원 현황' && (
              <EmptyState>
                <p>지원 현황 기능은 준비 중입니다.</p>
              </EmptyState>
            )}
          </TabSection>
        </Content>
      </Container>
    </>
  );
}