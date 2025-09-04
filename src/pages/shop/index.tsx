import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import NavBar from "@/components/NavBar";
import { apiClient } from '@/lib/api/client';

const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const Content = styled.div`
  max-width: 964px;
  margin: 0 auto;
  padding: 60px 32px;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const ShopName = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
`;

const ShopInfo = styled.div`
  color: #6b7280;
  font-size: 16px;
  margin-bottom: 24px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
`;

const ActionButton = styled.button`
  padding: 10px 16px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ea3c3c;
    color: #ea3c3c;
  }
`;

const PrimaryActionButton = styled.button`
  padding: 10px 16px;
  background: #ea3c3c;
  border: 1px solid #ea3c3c;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
  }
`;

const TabsContainer = styled.div`
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 32px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 32px;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 16px 0;
  background: none;
  border: none;
  color: ${props => props.$active ? '#ea3c3c' : '#6b7280'};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #ea3c3c;
    transform: ${props => props.$active ? 'scaleX(1)' : 'scaleX(0)'};
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #ea3c3c;
  }
`;

const NoticeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(312px, 1fr));
  gap: 14px;
  margin-bottom: 40px;
`;

const NoticeCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #ea3c3c;
  }
`;

const NoticeImage = styled.img`
  width: 100%;
  height: 168px;
  object-fit: cover;
  background: #f3f4f6;
`;

const NoticeContent = styled.div`
  padding: 20px;
`;

const NoticeTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
`;

const NoticeDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

const NoticeDetail = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const NoticeFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
`;

const HourlyPay = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

const PayIncrease = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #ea3c3c;
  background: #fef2f2;
  padding: 4px 8px;
  border-radius: 12px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 24px 0;
`;

const CreateNoticeButton = styled.button`
  background: #ea3c3c;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
  }
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

export default function Shop() {
  const router = useRouter();
  const [shopData, setShopData] = useState(null);
  const [activeTab, setActiveTab] = useState('등록한 공고');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 가게 정보 가져오기
        const shop = await apiClient.get('/shops/my');
        setShopData(shop);
        
        // 공고 목록 가져오기
        const noticeList = await apiClient.get('/notices');
        setNotices(noticeList.items || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateRaisePercent = (hourlyPay: number, originalPay: number) => {
    const percent = ((hourlyPay - originalPay) / originalPay * 100).toFixed(0);
    return `${percent}%`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleNoticeClick = (noticeId: string) => {
    router.push(`/notice/${noticeId}`);
  };

  const handleEditShop = () => {
    router.push('/shop/edit');
  };

  const handleCreateNotice = () => {
    router.push('/notice/create');
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <>
      <Head>
        <title>가게 관리 - THE JULGE</title>
        <meta name="description" content="가게 정보 및 공고를 관리하세요" />
      </Head>
      <NavBar />
      <Container>
        <Content>
          <Header>
            <ShopName>{shopData?.item?.name || '가게 이름'}</ShopName>
            <ShopInfo>
              📍 서울시 송파구 잠실동 123-45 | 🕐 기본 시급 15,000원
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

          <TabsContainer>
            <Tabs>
              <Tab 
                $active={activeTab === '등록한 공고'}
                onClick={() => setActiveTab('등록한 공고')}
              >
                등록한 공고
              </Tab>
              <Tab 
                $active={activeTab === '신청자 관리'}
                onClick={() => setActiveTab('신청자 관리')}
              >
                신청자 관리
              </Tab>
            </Tabs>
          </TabsContainer>

          {activeTab === '등록한 공고' && (
            <>
              {loading ? (
                <EmptyState>
                  <EmptyDescription>공고를 불러오는 중...</EmptyDescription>
                </EmptyState>
              ) : notices.length === 0 ? (
                <EmptyState>
                  <EmptyTitle>등록한 공고가 없어요</EmptyTitle>
                  <EmptyDescription>공고를 등록해서 직원을 모집해보세요.</EmptyDescription>
                  <CreateNoticeButton onClick={handleCreateNotice}>
                    공고 등록하기
                  </CreateNoticeButton>
                </EmptyState>
              ) : (
                <NoticeGrid>
                  {notices.map((notice) => (
                    <NoticeCard 
                      key={notice.id}
                      onClick={() => handleNoticeClick(notice.id)}
                    >
                      <NoticeImage src={notice.imageUrl} alt={notice.title} />
                      <NoticeContent>
                        <NoticeTitle>{notice.title}</NoticeTitle>
                        <NoticeDetails>
                          <NoticeDetail>
                            {formatDate(notice.startsAt)} ({notice.workhour}시간)
                          </NoticeDetail>
                          <NoticeDetail>{notice.description}</NoticeDetail>
                        </NoticeDetails>
                        <NoticeFooter>
                          <HourlyPay>{notice.hourlyPay.toLocaleString()}원</HourlyPay>
                          <PayIncrease>
                            {calculateRaisePercent(notice.hourlyPay, notice.originalHourlyPay)}↑
                          </PayIncrease>
                        </NoticeFooter>
                      </NoticeContent>
                    </NoticeCard>
                  ))}
                </NoticeGrid>
              )}
            </>
          )}

          {activeTab === '신청자 관리' && (
            <EmptyState>
              <EmptyTitle>신청자가 없어요</EmptyTitle>
              <EmptyDescription>아직 지원한 신청자가 없습니다.</EmptyDescription>
            </EmptyState>
          )}
        </Content>
      </Container>
    </>
  );
}
