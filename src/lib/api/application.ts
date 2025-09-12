import { authAxios } from "@/lib/axios";

export type ApplicationStatus = "pending" | "accepted" | "rejected" | "canceled";

export interface Application {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
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

export interface Paginated<T> {
  items: T[];
  count: number;
  hasNext: boolean;
}

// ✅ 공고에 지원하기
export const applyToNotice = async (
  shopId: string,
  noticeId: string
): Promise<{ item: Application }> => {
  const response = await authAxios.post(
    `/shops/${shopId}/notices/${noticeId}/applications`,
    {} // 백엔드가 body 필요 없다면 빈 객체
  );
  return response.data;
};

// ✅ 지원 취소
export const cancelApplication = async (
  shopId: string,
  noticeId: string,
  applicationId: string
): Promise<void> => {
  await authAxios.put(
    `/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
    { status: "canceled" }
  );
};

// ✅ 지원 승인/거절 (사장님)
export const updateApplicationStatus = async (
  shopId: string,
  noticeId: string,
  applicationId: string,
  status: "accepted" | "rejected"
): Promise<{ item: Application }> => {
  const response = await authAxios.put(
    `/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
    { status }
  );
  return response.data;
};

// ✅ 내 지원 내역 조회 (현재 로그인한 사용자)
export const getMyApplications = async (
  userId: string,
  params?: {
    offset?: number;
    limit?: number;
  }
): Promise<Paginated<Application>> => {
  const response = await authAxios.get(`/users/${userId}/applications`, {
    params,
  });
  return {
    items: response.data.items.map((x: any) => x.item),
    count: response.data.count,
    hasNext: response.data.hasNext,
  };
};

// ✅ 가게별 지원자 목록 조회 (사장님)
export const getApplicationsByNotice = async (
  shopId: string,
  noticeId: string,
  params?: {
    offset?: number;
    limit?: number;
  }
): Promise<Paginated<Application>> => {
  const response = await authAxios.get(
    `/shops/${shopId}/notices/${noticeId}/applications`,
    { params }
  );
  return {
    items: response.data.items.map((x: any) => x.item),
    count: response.data.count,
    hasNext: response.data.hasNext,
  };
};
