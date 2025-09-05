import React from "react";
import {
  PostCard,
  PostImage,
  PostContent,
  PostName,
  InfoRow,
  PostWageWrapper,
  Wage,
  PostDetails,
} from "./styles";
import WageBadge from "@/components/WageBadge";

export interface PostProps {
  id: number;
  imageUrl: string;
  name: string;
  startTime: string;  // "2025-09-02 15:00"
  endTime: string;    // "2025-09-02 18:30"
  location: string;
  wage: number;
  originalHourlyPay: number;
}

const Post: React.FC<PostProps> = ({
  imageUrl,
  name,
  startTime,
  endTime,
  location,
  wage,
  originalHourlyPay,
}) => {
  /** 근무시간 계산 */
  const getDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  };

  const duration = getDuration(startTime, endTime);

  /** 시작시간 포맷: yyyy-mm-dd HH:mm */
  const formatStartDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  };

  /** 종료시간 포맷: HH:mm */
  const formatEndTime = (dateString: string) => {
    const date = new Date(dateString);
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${hh}:${min}`;
  };

  /** 근무시간 표시: 정수면 소수점 제거, 소수면 1자리 */
  const formatDuration = (hours: number) =>
    hours % 1 === 0 ? `${hours}시간` : `${hours.toFixed(1)}시간`;

  const wagePercentage = originalHourlyPay
    ? Math.round(((wage - originalHourlyPay) / originalHourlyPay) * 100)
    : 0;

  return (
    <PostCard>
      <PostImage src={imageUrl} alt={name} />
      <PostContent>
        {/* 그룹 1: 이름 + 시간 + 위치 */}
        <PostDetails>
          <PostName>{name}</PostName>
          <InfoRow>
            <img src="/images/Postcard/clock.svg" alt="운영시간" />
            {formatStartDateTime(startTime)} ~ {formatEndTime(endTime)} ({formatDuration(duration)})
          </InfoRow>
          <InfoRow>
            <img src="/images/Postcard/location.svg" alt="위치" />
            {location}
          </InfoRow>
        </PostDetails>

        {/* 그룹 2: 시급 + 뱃지 */}
        <PostWageWrapper>
          <Wage>{wage.toLocaleString()}원</Wage>
          <WageBadge percentage={wagePercentage} />
        </PostWageWrapper>
      </PostContent>
    </PostCard>
  );
};

export default Post;
