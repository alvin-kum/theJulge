<<<<<<< HEAD
import dynamic from 'next/dynamic';
import React from 'react';
=======
import React from "react";
import {
  PostCard,
  ImageWrapper,
  PostImage,
  PostContent,
  PostName,
  InfoRow,
  InfoText,
  PostHourlyPayWrapper,
  HourlyPay,
  PostDetails,
  ClosedOverlay,
} from "./styles";
import HourlyPayBadge from "@/components/HourlyPayBadge";
>>>>>>> JHY

export interface PostProps {
  id: number;
  imageUrl: string;
  name: string;
<<<<<<< HEAD
  startTime: string;
  endTime: string;
  location: string;
  wage: number;
  originalHourlyPay: number;
  duration?: number;
}

// ✅ 클라이언트에서만 렌더링되는 PostCard
const PostCardClient = dynamic(
  () => import('./PostCardClient'),
  {
    ssr: false,
    loading: () => (
      <div 
        style={{ 
          width: '100%', 
          height: '200px', 
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6c757d'
        }}
      >
        <div>
          <div>📋 카드 로딩 중...</div>
        </div>
      </div>
    )
  }
);

const Post: React.FC<PostProps> = (props) => {
  return <PostCardClient {...props} />;
=======
  startsAt: string;     // "2025-01-02T15:00:00"
  workhour: number;     // 근무 시간(숫자)
  address1: string;
  hourlyPay: number;
  originalHourlyPay: number;
  onClick?: () => void;
}

const Post: React.FC<PostProps> = ({
  imageUrl = "",
  name = "",
  startsAt = "",
  workhour = 0,
  address1 = "",
  hourlyPay = 0,
  originalHourlyPay = 0,
  onClick,
}) => {
  /** 시작일 Date 객체 (UTC 대신 로컬 기준으로 파싱) */
  const startDate = new Date(startsAt.replace("Z", ""));

  /** 종료시간 계산 */
  const endDate = new Date(startDate.getTime() + workhour * 60 * 60 * 1000);

  /** 시작시간 포맷: yyyy-mm-dd HH:mm */
  const formatStartDateTime = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  };

  /** 종료시간 포맷: HH:mm */
  const formatEndTime = (date: Date) => {
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${hh}:${min}`;
  };

  /** 근무시간 표시: 정수면 소수점 제거, 소수면 1자리 */
  const formatDuration = (hours: number) =>
    hours % 1 === 0 ? `${hours}시간` : `${hours.toFixed(1)}시간`;

  const isClosed = startDate < new Date();

  const hourlyPayPercentage = originalHourlyPay
    ? Math.round(((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100)
    : 0;

  return (
    <PostCard onClick={onClick}>
      <ImageWrapper>
        <PostImage src={imageUrl} alt={name} />
        {isClosed && <ClosedOverlay>마감 완료</ClosedOverlay>}
      </ImageWrapper>
      <PostContent>
        {/* 그룹 1: 이름 + 시간 + 위치 */}
        <PostDetails>
          <PostName $isClosed={isClosed}>{name}</PostName>
          <InfoRow>
            <img
              src={
                isClosed
                  ? "/images/Postcard/clock_closed.svg"
                  : "/images/Postcard/clock.svg"
              }
              alt="운영시간"
            />
            <InfoText $isClosed={isClosed}>
              {formatStartDateTime(startDate)} ~ {formatEndTime(endDate)} (
              {formatDuration(workhour)})
            </InfoText>
          </InfoRow>
          <InfoRow>
            <img
              src={
                isClosed
                  ? "/images/Postcard/address1_closed.svg"
                  : "/images/Postcard/address1.svg"
              }
              alt="위치"
            />
            <InfoText $isClosed={isClosed}>{address1}</InfoText>
          </InfoRow>
        </PostDetails>

        {/* 그룹 2: 시급 + 뱃지 */}
        <PostHourlyPayWrapper>
          <HourlyPay $isClosed={isClosed}>
            {hourlyPay.toLocaleString()}원
          </HourlyPay>
          <HourlyPayBadge percentage={hourlyPayPercentage} isClosed={isClosed} />
        </PostHourlyPayWrapper>
      </PostContent>
    </PostCard>
  );
>>>>>>> JHY
};

export default Post;
