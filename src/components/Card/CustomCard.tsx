import Image from "next/image";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const Card = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 16px;
  margin: 16px;
  max-width: 300px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 12px;
  background: #f0f0f0;
`;

const CardTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`;

const CardInfo = styled.p`
  margin: 4px 0;
  color: #6b7280;
  font-size: 14px;
`;

const PayInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
`;

type Props = {
  imageSrc: string;
  storeName: string;
  date: string;
  workhour: number;
  location: string;
  hourlyPay: string;
  raisePercent: string;
  handleClick: () => void;
};

export default function CustomCard({
  imageSrc,
  storeName,
  date,
  workhour,
  location,
  hourlyPay,
  raisePercent,
  handleClick,
}: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Card onClick={handleClick}>
      <CardImage src={imageSrc} alt={storeName} />
      <CardTitle>{storeName}</CardTitle>
      <CardInfo>
        {formatDate(date)} ({workhour}시간)
      </CardInfo>
      <CardInfo>{location}</CardInfo>
      <PayInfo>
        <span style={{ fontWeight: "600", fontSize: "16px" }}>
          시급 {hourlyPay}원
        </span>
        <span
          style={{
            color: "#ef4444",
            fontWeight: "600",
            fontSize: "12px",
            background: "#fef2f2",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          {raisePercent} ↗
        </span>
      </PayInfo>
    </Card>
  );
}
