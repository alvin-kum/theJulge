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
  startTime: string;
  endTime: string;
  location: string;
  wage: number;
  originalHourlyPay: number;
  duration?: number;
}

// ✅ 안전한 날짜 처리 (클라이언트에서만 실행)
const formatStartDateTime = (startTime: string): string => {
  if (!startTime) return "시간 미정";

  try {
    // 잘못된 날짜 보정
    let dateString = startTime;
    if (dateString.includes("2023-02-31")) {
      dateString = dateString.replace("2023-02-31", "2023-03-03");
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "시간 미정";

    return (
      date.toLocaleDateString("ko-KR") +
      " " +
      date.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
  } catch {
    return "시간 미정";
  }
};

const formatEndTime = (endTime: string): string => {
  if (!endTime) return "미정";

  try {
    let dateString = endTime;
    if (dateString.includes("2023-02-31")) {
      dateString = dateString.replace("2023-02-31", "2023-03-03");
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "미정";

    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return "미정";
  }
};

const PostCardClient: React.FC<PostProps> = ({
  id,
  imageUrl,
  name,
  startTime,
  endTime,
  location,
  wage,
  originalHourlyPay,
  duration,
}) => {
  const wagePercentage =
    originalHourlyPay > 0
      ? Math.round(((wage - originalHourlyPay) / originalHourlyPay) * 100)
      : 0;

  const formattedStartTime = formatStartDateTime(startTime);
  const formattedEndTime = formatEndTime(endTime);
  const durationText = duration && duration > 0 ? `${duration}시간` : "";

  return (
    <PostCard>
      <div className="post-image-container">
        <PostImage src={imageUrl || "/images/placeholder.jpg"} alt={name} />
      </div>
      <PostContent>
        <div className="post-info">
          <PostDetails>
            <PostName>{name}</PostName>
            <InfoRow>
              <img src="/images/Postcard/clock.svg" alt="운영시간" />
              {formattedStartTime} ~ {formattedEndTime}
              {durationText && ` (${durationText})`}
            </InfoRow>
            <InfoRow>
              <img src="/images/Postcard/location.svg" alt="위치" />
              {location || "위치 정보 없음"}
            </InfoRow>
          </PostDetails>
        </div>
        <PostWageWrapper>
          <Wage>{wage?.toLocaleString() || "0"}원</Wage>
          {wagePercentage > 0 && <WageBadge percentage={wagePercentage} />}
        </PostWageWrapper>
      </PostContent>
    </PostCard>
  );
};

export default PostCardClient;
