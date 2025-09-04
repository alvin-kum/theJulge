import apiClient from '../axios';

export interface Application {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  createdAt: string;
  item: {
    id: string;
    status: 'pending' | 'accepted' | 'rejected' | 'canceled';
    createdAt: string;
  };
  notice: {
    id: string;
    hourlyPay: number;
    startsAt: string;
    workhour: number;
    description: string;
    closed: boolean;
    shop: {
      id: string;
      name: string;
      address1: string;
      category: string;
      imageUrl: string;
    };
  };
}

// 공고에 지원하기
export const applyToNotice = async (shopId: string, noticeId: string): Promise<{ item: Application }> => {
  const response = await apiClient.post(`/shops/${shopId}/notices/${noticeId}/applications`);
  return response.data;
};

// 지원 취소
export const cancelApplication = async (shopId: string, noticeId: string, applicationId: string): Promise<void> => {
  await apiClient.put(`/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`, {
    status: 'canceled'
  });
};

// 지원 승인/거절 (사장님)
export const updateApplicationStatus = async (
  shopId: string, 
  noticeId: string, 
  applicationId: string, 
  status: 'accepted' | 'rejected'
): Promise<{ item: Application }> => {
  const response = await apiClient.put(`/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`, {
    status
  });
  return response.data;
};

// 내 지원 내역 조회
export const getMyApplications = async (params?: {
  offset?: number;
  limit?: number;
}): Promise<{ 
  items: Application[];
  count: number;
  hasNext: boolean;
}> => {
  const response = await apiClient.get('/user/applications', { params });
  return response.data;
};

// 가게별 지원자 목록 조회 (사장님)
export const getApplicationsByNotice = async (shopId: string, noticeId: string, params?: {
  offset?: number;
  limit?: number;
}): Promise<{ 
  items: Application[];
  count: number;
  hasNext: boolean;
}> => {
  const response = await apiClient.get(`/shops/${shopId}/notices/${noticeId}/applications`, { params });
  return response.data;
};
