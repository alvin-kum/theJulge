import React from "react";
import { BadgeWrapper } from "./styles";

interface WageBadgeProps {
  percentage: number;
}

const WageBadge: React.FC<WageBadgeProps> = ({ percentage }) => {
  if (percentage <= 0) return null;

  // 레벨 계산
  let level = 1;
  if (percentage <= 50) level = 1;
  else if (percentage <= 75) level = 2;
  else level = 3;

  return (
    <BadgeWrapper $level={level}>
      {/* 모바일: 레벨별 텍스트 컬러, 데스크탑: 흰색 텍스트 + 배경 */}
      기존 시급보다 {percentage}% ⬆
    </BadgeWrapper>
  );
};

export default WageBadge;
