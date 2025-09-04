import { apiClient } from './client';

export interface Shop {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
  user?: {
    item: {
      id: string;
      email: string;
      type: 'employer' | 'employee';
      name?: string;
      phone?: string;
      address?: string;
      bio?: string;
    };
    href: string;
  };
}

export interface ShopFormData {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

export interface Notice {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
  shop?: {
    item: Shop;
    href: string;
  };
}

export interface NoticeFormData {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
}

export interface Application {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  createdAt: string;
  user: {
    item: {
      id: string;
      email: string;
      type: 'employer' | 'employee';
      name?: string;
      phone?: string;
      address?: string;
      bio?: string;
    };
    href: string;
  };
  shop: {
    item: Shop;
    href: string;
  };
  notice: {
    item: Notice;
    href: string;
  };
}

// 가게 등록
export const createShop = (data: ShopFormData) => {
  return apiClient.post<{ item: Shop }>('/shops', data);
};

// 가게 정보 조회
export const getShop = (shopId: string) => {
  return apiClient.get<{ item: Shop }>(`/shops/${shopId}`);
};

// 가게 정보 수정
export const updateShop = (shopId: string, data: ShopFormData) => {
  return apiClient.put<{ item: Shop }>(`/shops/${shopId}`, data);
};

// 가게의 공고 목록 조회
export const getShopNotices = (shopId: string, params?: { offset?: number; limit?: number }) => {
  const query = new URLSearchParams();
  if (params?.offset) query.append('offset', params.offset.toString());
  if (params?.limit) query.append('limit', params.limit.toString());
  
  return apiClient.get<{
    items: { item: Notice }[];
    offset: number;
    limit: number;
    count: number;
    hasNext: boolean;
  }>(`/shops/${shopId}/notices?${query.toString()}`);
};

// 가게 공고 등록
export const createNotice = (shopId: string, data: NoticeFormData) => {
  return apiClient.post<{ item: Notice }>(`/shops/${shopId}/notices`, data);
};

// 가게의 특정 공고 조회
export const getShopNotice = (shopId: string, noticeId: string) => {
  return apiClient.get<{ item: Notice }>(`/shops/${shopId}/notices/${noticeId}`);
};

// 가게의 특정 공고 수정
export const updateNotice = (shopId: string, noticeId: string, data: NoticeFormData) => {
  return apiClient.put<{ item: Notice }>(`/shops/${shopId}/notices/${noticeId}`, data);
};

// 가게의 특정 공고의 지원 목록 조회
export const getNoticeApplications = (shopId: string, noticeId: string, params?: { offset?: number; limit?: number }) => {
  const query = new URLSearchParams();
  if (params?.offset) query.append('offset', params.offset.toString());
  if (params?.limit) query.append('limit', params.limit.toString());
  
  return apiClient.get<{
    items: { item: Application }[];
    offset: number;
    limit: number;
    count: number;
    hasNext: boolean;
  }>(`/shops/${shopId}/notices/${noticeId}/applications?${query.toString()}`);
};

// 지원 상태 변경 (승인/거절/취소)
export const updateApplicationStatus = (
  shopId: string, 
  noticeId: string, 
  applicationId: string, 
  status: 'accepted' | 'rejected' | 'canceled'
) => {
  return apiClient.put<{ item: Application }>(
    `/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
    { status }
  );
};
