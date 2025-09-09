import axios from "axios";

// 타입 정의
interface NoticeItem {
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
}

interface ShopNoticeItem {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

interface ListNoticesResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: Array<{ item: NoticeItem }>;
}

interface ListShopNoticesResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: Array<{ item: ShopNoticeItem }>;
}

// axios 인스턴스 생성 (기본 URL 설정)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://bootcamp-api.codeit.kr/api/17-3/the-julge', // 실제 API 도메인으로 변경
});

export async function listNotices(params: {
  offset?: number;
  limit?: number;
  address?: string;
  keyword?: string;
  startsAtGte?: string;
  hourlyPayGte?: number;
  sort?: "time" | "pay" | "hour" | "shop";
}) {
  const { data } = await api.get<ListNoticesResponse>("/notices", { params });
  return data;
}

export async function listShopNotices(
  shopId: string,
  params: { offset?: number; limit?: number }
) {
  const { data } = await api.get<ListShopNoticesResponse>(`/shops/${shopId}/notices`, { params });
  return data;
}

export async function createShopNotice(
  shopId: string,
  payload: {
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
  }
) {
  const { data } = await api.post<{ item: { id: string } }>(`/shops/${shopId}/notices`, payload);
  return data.item;
}

export async function getShopNotice(shopId: string, noticeId: string) {
  const { data } = await api.get<{ item: ShopNoticeItem }>(`/shops/${shopId}/notices/${noticeId}`);
  return data.item;
}

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
  const { data } = await api.put<{ item: ShopNoticeItem }>(
    `/shops/${shopId}/notices/${noticeId}`,
    payload
  );
  return data.item;
}