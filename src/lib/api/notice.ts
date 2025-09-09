// src/lib/api/notice.ts
import { plainAxios, authAxios } from "@/lib/axios";

// 공고 리스트 (공개)
export async function listNotices(params: {
  offset?: number;
  limit?: number;
  address?: string;
  keyword?: string;
  startsAtGte?: string;
  hourlyPayGte?: number;
  sort?: "time" | "pay" | "hour" | "shop";
}) {
  const { data } = await plainAxios.get("/notices", { params });
  return data as {
    offset: number;
    limit: number;
    count: number;
    hasNext: boolean;
    items: Array<{
      item: {
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
      };
    }>;
  };
}

// 특정 가게의 공고 목록 (공개)
export async function listShopNotices(
  shopId: string,
  params: { offset?: number; limit?: number }
) {
  const { data } = await plainAxios.get(`/shops/${shopId}/notices`, { params });
  return data as {
    offset: number;
    limit: number;
    count: number;
    hasNext: boolean;
    items: Array<{
      item: {
        id: string;
        hourlyPay: number;
        startsAt: string;
        workhour: number;
        description: string;
        closed: boolean;
      };
    }>;
  };
}

// 공고 생성 (인증 필요)
export async function createShopNotice(
  shopId: string,
  payload: {
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
  }
) {
  const { data } = await authAxios.post(`/shops/${shopId}/notices`, payload);
  return data.item as { id: string };
}

// 특정 공고 상세 (공개)
export async function getShopNotice(shopId: string, noticeId: string) {
  const { data } = await plainAxios.get(`/shops/${shopId}/notices/${noticeId}`);
  return data.item;
}

// 공고 수정 (인증 필요)
export async function updateShopNotice(
  shopId: string,
  noticeId: string,
  payload: {
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
  }
) {
  const { data } = await authAxios.put(
    `/shops/${shopId}/notices/${noticeId}`,
    payload
  );
  return data.item;
}
