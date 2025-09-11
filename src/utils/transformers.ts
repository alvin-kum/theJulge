// transformers.ts
import type { PostData } from "@/types/shop";

// 안전한 ID 변환 함수
const safeParseId = (id: string): number => {
  if (isNaN(parseInt(id))) {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      const char = id.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
  return parseInt(id);
};

// 서버에서 오는 NoticeItem 타입
export type NoticeItem = {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop: {
    item: {
      id: string;
      name: string;
      imageUrl: string;
      address1: string;
    };
  };
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  imageUrl?: string;
  address1?: string;
};

// NoticeItem을 PostData로 변환
export const transformNoticeToPostData = (notice: NoticeItem): PostData => {
  return {
    id: notice.id,
    shopId: notice.shop.item.id,
    name: notice.name ?? notice.shop.item.name,
    imageUrl: notice.imageUrl ?? notice.shop.item.imageUrl,
    address1: notice.address1 ?? notice.shop.item.address1,
    hourlyPay: notice.hourlyPay,
    originalHourlyPay: notice.hourlyPay, // ✅ 추가
    startsAt: notice.startsAt,
    workhour: notice.workhour,
    description: notice.description,
    closed: notice.closed,
    createdAt: notice.createdAt ?? "",
    updatedAt: notice.updatedAt ?? "",
  };
};
