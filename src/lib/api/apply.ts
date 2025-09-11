// src/lib/api/apply.ts
import { authAxios } from "@/lib/axios";

export interface ApplyResponse {
  item: { id: string /* 필요하면 필드 더 추가 */ };
}

/** 공고 신청 */
export async function applyNotice(shopId: string, noticeId: string) {
  // 백엔드 스펙에 맞춰 경로가 다르면 여기만 바꿔주세요.
  // 흔한 패턴: POST /shops/:shopId/notices/:noticeId/applications
  const { data } = await authAxios.post<ApplyResponse>(
    `/shops/${shopId}/notices/${noticeId}/applications`,
    {} // body 필요 없으면 빈 객체
  );
  const applicationId = data.item.id;

  if (typeof window !== "undefined") {
    localStorage.setItem("applicationId", applicationId);
  }

  return data.item; // { id }
}

/** 신청 취소하기 (신청 ID 필요) */
export async function cancelNotice(
  shopId: string,
  noticeId: string,
  applicationId: string
) {
  // 상태 변경 엔드포인트 활용
  const { data } = await authAxios.put<{
    item: { id: string; status: string };
  }>(`/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`, {
    status: "canceled",
  });
  return data.item;
}
