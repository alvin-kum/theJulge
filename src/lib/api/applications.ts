// src/lib/api/application.ts
import { authAxios } from "@/lib/axios";

/** 공통 상태 타입 */
export type ApplicationStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "canceled";

/** 서버 응답 item 형태(필요 필드만 선정) */
export interface Application {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  user?: {
    item: { id: string; email?: string; type?: "employer" | "employee" };
    href?: string;
  };
  notice?: {
    item: {
      id: string;
      hourlyPay: number;
      startsAt: string;
      workhour: number;
      description: string;
      closed: boolean;
      shop?: {
        item: {
          id: string;
          name: string;
          address1: string;
          category: string;
          imageUrl: string;
        };
        href?: string;
      };
    };
    href?: string;
  };
}

/** 리스트 응답 공통 래퍼 */
export interface Paginated<T> {
  items: { item: T }[];
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
}

/** 단건 응답 공통 래퍼 */
export interface ItemResp<T> {
  item: T;
}

/* ========================== 생성/변경 =========================== */

/** 공고에 지원하기 */
export const applyToNotice = async (
  shopId: string,
  noticeId: string
): Promise<ItemResp<Application>> => {
  const { data } = await authAxios.post<ItemResp<Application>>(
    `/shops/${shopId}/notices/${noticeId}/applications`,
    {} // 백엔드가 body를 요구하지 않으면 빈 객체
  );
  return data; // { item: { id, status, ... } }
};

/** 지원 취소(상태 변경) */
export const cancelApplication = async (
  shopId: string,
  noticeId: string,
  applicationId: string
): Promise<ItemResp<Application>> => {
  const { data } = await authAxios.put<ItemResp<Application>>(
    `/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
    { status: "canceled" as ApplicationStatus }
  );
  return data;
};

/** (사장님) 지원 승인/거절 */
export const updateApplicationStatus = async (
  shopId: string,
  noticeId: string,
  applicationId: string,
  status: Extract<ApplicationStatus, "accepted" | "rejected">
): Promise<ItemResp<Application>> => {
  const { data } = await authAxios.put<ItemResp<Application>>(
    `/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
    { status }
  );
  return data;
};

/* ============================ 조회 ============================= */

/** 내 지원 내역 목록 */
export const getMyApplications = async (params?: {
  offset?: number;
  limit?: number;
}): Promise<Paginated<Application>> => {
  // NOTE: 프로젝트에 따라 경로가 '/users/me/applications' 인 경우도 있으니
  // 실제 백엔드 스펙에 맞춰 아래 라우트를 조정하세요.
  const { data } = await authAxios.get<Paginated<Application>>(
    `/user/applications`,
    { params }
  );
  return data;
};

/** (사장님) 특정 공고의 지원자 목록 */
export const getApplicationsByNotice = async (
  shopId: string,
  noticeId: string,
  params?: { offset?: number; limit?: number }
): Promise<Paginated<Application>> => {
  const { data } = await authAxios.get<Paginated<Application>>(
    `/shops/${shopId}/notices/${noticeId}/applications`,
    { params }
  );
  return data;
};

/* ============== 내 신청 단건 찾기(공고 상세 진입 시) ============== */
/**
 * 현재 로그인 유저(userId)가 특정 공고(noticeId)에 제출한 신청 1건을 찾아 반환합니다.
 * 서버가 mine=true 같은 필터를 지원하지 않아도 동작하도록 페이지네이션 순회로 구현.
 */
export const getMyApplicationForNotice = async (
  shopId: string,
  noticeId: string,
  userId: string
): Promise<Application | null> => {
  let offset = 0;
  const limit = 50;

  while (true) {
    const { data } = await authAxios.get<Paginated<Application>>(
      `/shops/${shopId}/notices/${noticeId}/applications`,
      { params: { offset, limit } }
    );

    const found = data.items
      .map((x) => x.item)
      .find((app) => app.user?.item?.id === userId);

    if (found) return found;
    if (!data.hasNext) break;
    offset = data.offset + data.limit;
  }
  return null;
};
