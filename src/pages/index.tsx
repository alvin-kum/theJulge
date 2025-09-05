import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import NavBar from "@/components/NavBar";
import CustomCard from "@/components/Card/CustomCard"; // 경로 수정!

const Container = styled.div`
  min-height: 100vh;
  background: #fafafa;
  padding-top: 80px;  /* NavBar 높이만큼 여백 추가 */
`;

const HeroSection = styled.section`
  background: #fff;
  padding: 80px 24px 60px;
  text-align: center;
  border-bottom: 1px solid #e5e7eb;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const MainTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
  line-height: 1.2;
`;

const SubTitle = styled.p`
  font-size: 20px;
  color: #6b7280;
  margin-bottom: 40px;
  font-weight: 400;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background: #ea3c3c;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;

  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 140px;

  &:hover {
    border-color: #ea3c3c;
    color: #ea3c3c;
    transform: translateY(-1px);
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px;
`;

const SectionHeader = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

const SectionDescription = styled.p`
  font-size: 16px;
  color: #6b7280;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? '#ea3c3c' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  border: 1px solid ${props => props.$active ? '#ea3c3c' : '#d1d5db'};
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ea3c3c;
    color: ${props => props.$active ? 'white' : '#ea3c3c'};
  }
`;

const NoticeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(312px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const LoadingText = styled.p`
  color: #6b7280;
  font-size: 16px;
`;

const EmptyContainer = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const EmptyText = styled.p`
  color: #9ca3af;
  font-size: 16px;
  margin-bottom: 24px;
`;

const ViewMoreButton = styled.button`
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: block;
  margin: 0 auto;

  &:hover {
    border-color: #ea3c3c;
    color: #ea3c3c;
  }
`;

interface Notice {
  id: string;
  shop: {
    name: string;
    imageUrl: string;
    address1: string;
    originalHourlyPay: number;
  };
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

export default function Home() {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('전체');

  const filters = ['전체', '식당', '카페', '편의점', '기타'];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const demoNotices: Notice[] = [
          {
            id: '1',
            shop: {
              name: '스타벅스 강남점',
              imageUrl: 'https://via.placeholder.com/312x168?text=Starbucks',
              address1: '서울시 강남구',
              originalHourlyPay: 12000,
            },
            hourlyPay: 15000,
            startsAt: '2024-12-25T09:00:00Z',
            workhour: 8,
            description: '주말 바리스타 구합니다',
            closed: false,
          },
          {
            id: '2',
            shop: {
              name: '맥도날드 홍대점',
              imageUrl: 'https://via.placeholder.com/312x168?text=McDonalds',
              address1: '서울시 마포구',
              originalHourlyPay: 11000,
            },
            hourlyPay: 14000,
            startsAt: '2024-12-26T14:00:00Z',
            workhour: 6,
            description: '주방 보조 및 홀 서빙',
            closed: false,
          },
          {
            id: '3',
            shop: {
              name: '롯데리아 신촌점',
              imageUrl: 'https://via.placeholder.com/312x168?text=Lotteria',
              address1: '서울시 서대문구',
              originalHourlyPay: 10500,
            },
            hourlyPay: 13000,
            startsAt: '2024-12-27T18:00:00Z',
            workhour: 5,
            description: '저녁 시간 아르바이트',
            closed: false,
          },
        ];

        setTimeout(() => {
          setNotices(demoNotices);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const calculateRaisePercent = (hourlyPay: number, originalPay: number) => {
    const percent = ((hourlyPay - originalPay) / originalPay * 100).toFixed(0);
    return `${percent}%`;
  };

  const handleCardClick = (noticeId: string) => {
    router.push(`/notice/${noticeId}`);
  };

  const handleEmployeeAction = () => {
    router.push('/notice');
  };

  const handleEmployerAction = () => {
    router.push('/shop');
  };

  const handleCreateFirstNotice = () => {
    router.push('/shop/register');
  };

  return (
    <>
      <Head>
        <title>일자리를 부탁해 - 급하게 일손이 필요한 사장님과 안전하고 빠른 일자리를 찾는 알바님을 위한 서비스</title>
        <meta name="description" content="급하게 일손이 필요한 사장님과 안전하고 빠른 일자리를 찾는 알바님을 위한 서비스" />
      </Head>
      <NavBar />
      <Container>
        <HeroSection>
          <HeroContent>
            <MainTitle>
              일자리를 부탁해
            </MainTitle>
            <SubTitle>
              급하게 일손이 필요한 사장님과 안전하고 빠른 일자리를 찾는 알바님을 위한 서비스
            </SubTitle>
            <CTAButtons>
              <PrimaryButton onClick={handleEmployeeAction}>
                알바 찾기
              </PrimaryButton>
              <SecondaryButton onClick={handleEmployerAction}>
                알바 등록하기
              </SecondaryButton>
            </CTAButtons>
          </HeroContent>
        </HeroSection>

        <ContentSection>
          <SectionHeader>
            <SectionTitle>맞춤 공고</SectionTitle>
            <SectionDescription>
              회원님을 위한 맞춤 공고를 찾아보세요
            </SectionDescription>
          </SectionHeader>

          <FilterButtons>
            {filters.map((filter) => (
              <FilterButton
                key={filter}
                $active={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </FilterButton>
            ))}
          </FilterButtons>

          {loading ? (
            <LoadingContainer>
              <LoadingText>맞춤 공고를 불러오는 중...</LoadingText>
            </LoadingContainer>
          ) : notices.length === 0 ? (
            <EmptyContainer>
              <EmptyText>아직 등록된 공고가 없어요</EmptyText>
              <PrimaryButton onClick={handleCreateFirstNotice}>
                첫 공고 등록하기
              </PrimaryButton>
            </EmptyContainer>
          ) : (
            <>
              <NoticeGrid>
                {notices.map((notice) => (
                  <CustomCard
                    key={notice.id}
                    imageSrc={notice.shop.imageUrl}
                    storeName={notice.shop.name}
                    date={notice.startsAt}
                    workhour={notice.workhour}
                    location={notice.shop.address1}
                    hourlyPay={notice.hourlyPay.toLocaleString()}
                    raisePercent={calculateRaisePercent(notice.hourlyPay, notice.shop.originalHourlyPay)}
                    handleClick={() => handleCardClick(notice.id)}
                  />
                ))}
              </NoticeGrid>
              
              <ViewMoreButton onClick={() => router.push('/notice')}>
                공고 더보기
              </ViewMoreButton>
            </>
          )}
        </ContentSection>
      </Container>
    </>
  );
}