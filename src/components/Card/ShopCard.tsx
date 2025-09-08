import styled from "styled-components";
import { useEffect, useState } from "react";
import { getShop } from "@/lib/api/shop";
import type { Shop } from "@/types/shop";
import Link from "next/link";
import { Skeleton } from "@/components/Skeleton";
import { useRouter } from "next/router";

const Card = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 312px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: #ea3c3c;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 168px;
  object-fit: cover;
  background: #f3f4f6;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const ShopName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
  line-height: 1.2;
`;

const ShopInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const PaySection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
`;

const PayAmount = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

interface ShopCardProps {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  imageSrc: string;
  onClick?: () => void;
}

export default function ShopCard({
  shopId,
  name,
  description,
  location,
  category,
  imageSrc,
  onClick,
}: ShopCardProps) {
  const router = useRouter();
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ getShop(shopId).then(setShop).finally(()=>setLoading(false)); },[shopId]);

  const handleClick = () => {
    router.push(`/shop/${shopId}`);
  };

  if (loading) return <Card><Skeleton h={220} r={12}/><div style={{height:12}}/><Skeleton h={20}/><div style={{height:8}}/><Skeleton h={14}/></Card>;
  if (!shop) return <Card>가게 정보를 불러오지 못했어요.</Card>;

  return (
    <Card onClick={handleClick}>
      <CardImage src={imageSrc} alt={name} />
      <CardContent>
        <ShopName>{name}</ShopName>
        <ShopInfo>
          <InfoText>{location}</InfoText>
        </ShopInfo>
        <PaySection>
          <PayAmount>{shop.hourlyPay.toLocaleString()}원</PayAmount>
        </PaySection>
      </CardContent>
    </Card>
  );
}
