import { api } from "../axios";

export async function listNotices(params: {
  offset?: number; limit?: number; address?: string; keyword?: string;
  startsAtGte?: string; hourlyPayGte?: number; sort?: "time"|"pay"|"hour"|"shop";
}) {
  const { data } = await api.get("/notices", { params });
  return data as {
    offset: number; limit: number; count: number; hasNext: boolean;
    items: Array<{ item: {
      id: string; hourlyPay: number; startsAt: string; workhour: number;
      description: string; closed: boolean; shop: { item: { id: string; name: string; imageUrl: string; address1: string; } }
    }}>;
  };
}

export async function listShopNotices(shopId: string, params: { offset?: number; limit?: number; }) {
  const { data } = await api.get(`/shops/${shopId}/notices`, { params });
  return data as {
    offset: number; limit: number; count: number; hasNext: boolean;
    items: Array<{ item: {
      id: string; hourlyPay: number; startsAt: string; workhour: number; description: string; closed: boolean;
    }}>;
  };
}

export async function createShopNotice(shopId: string, payload: {
  hourlyPay: number; startsAt: string; workhour: number; description: string;
}) {
  const { data } = await api.post(`/shops/${shopId}/notices`, payload);
  return data.item as { id: string };
}

export async function getShopNotice(shopId: string, noticeId: string) {
  const { data } = await api.get(`/shops/${shopId}/notices/${noticeId}`);
  return data.item;
}

export async function updateShopNotice(shopId: string, noticeId: string, payload: {
  hourlyPay: number; startsAt: string; workhour: number; description: string;
}) {
  const { data } = await api.put(`/shops/${shopId}/notices/${noticeId}`, payload);
  return data.item;
}
