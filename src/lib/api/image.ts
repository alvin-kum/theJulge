// src/lib/api/image.ts
import { apiClient } from "./client";

type PresignPut = {
  presignedUrl?: string;     // 일부 서버는 presignedUrl로 내려줌
  url?: string;              // 일부 서버는 url로만 내려줌 (쿼리 포함 PUT 전용)
  fileUrl?: string;          // 조회용 절대 URL을 같이 주는 경우
  key?: string;              // S3 객체 키 (조회 URL을 만들 때 사용)
  cdnBase?: string;          // CDN 베이스 (있으면 우선)
};

type PresignPost = {
  url: string;               // POST form endpoint
  fields: Record<string, string>;
  fileUrl?: string;
  key?: string;
  cdnBase?: string;
};

type Wrapped<T> = { item: T };

function unwrap<T>(res: any): T {
  return (res?.item ?? res) as T;
}

function buildPublicUrl(key?: string, cdnBase?: string) {
  if (!key) return undefined;
  if (cdnBase) return `${cdnBase.replace(/\/+$/, "")}/${key.replace(/^\/+/, "")}`;
  // 프로젝트 기본 S3 공개 URL (환경에 맞게 수정 가능)
  const s3Base = "https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com";
  return `${s3Base}/${key}`;
}

function stripQuery(u?: string | null) {
  return u ? u.split("?")[0] : "";
}

export async function uploadImage(file: File): Promise<string> {
  // 파일명 안전하게 (확장자 유지)
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const safeName = file.name ? file.name : `upload-${Date.now()}.${ext}`;

  // 1) Presign 요청
  const presignRes = await apiClient.post<
    Wrapped<PresignPut | PresignPost> | (PresignPut | PresignPost)
  >("/images", { name: safeName });
  const payload = unwrap<PresignPut | PresignPost>(presignRes);

  // 2) S3 POST form (url + fields)
  if ("url" in payload && (payload as PresignPost).fields) {
    const { url, fields, fileUrl, key, cdnBase } = payload as PresignPost;
    const fd = new FormData();
    Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
    fd.append("file", file);

    const postRes = await fetch(url, { method: "POST", body: fd });
    if (!postRes.ok) throw new Error(`이미지 업로드 실패(POST form): ${postRes.status}`);

    // 보기 URL 결정: 서버가 주면 그대로, 없으면 key/cdnBase로 구성
    const viewUrl = fileUrl ?? buildPublicUrl(key, cdnBase);
    if (!viewUrl) throw new Error("이미지 보기 URL을 결정할 수 없습니다. (fileUrl/key 필요)");
    return viewUrl;
  }

  // 3) Presigned PUT (서버가 presignedUrl 또는 url 로 줄 수 있음)
  const putUrl =
    ("presignedUrl" in payload && payload.presignedUrl) ||
    ("url" in payload && (payload as PresignPut).url);

  if (putUrl) {
    const res = await fetch(putUrl!, {
      method: "PUT",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body: file,
    });
    if (!res.ok) throw new Error(`이미지 업로드 실패(PUT): ${res.status}`);

    // 보기 URL: 서버가 fileUrl 주면 그거, 없으면 key/cdnBase, 둘 다 없으면 **PUT URL의 쿼리 제거본**
    const { fileUrl, key, cdnBase } = payload as PresignPut;
    const built = fileUrl ?? buildPublicUrl(key, cdnBase) ?? stripQuery(putUrl as string);
    if (!built) throw new Error("이미지 보기 URL을 결정할 수 없습니다.");
    return built;
  }

  // 4) 혹시 단일 url만 내려오는 특수 케이스 (이미 public일 수도 있음)
  if ("url" in payload && (payload as PresignPut).url) {
    // 이 케이스가 업로드 URL인지 공개 URL인지 불명확 → 보수적으로 쿼리 제거
    return stripQuery((payload as PresignPut).url);
  }

  throw new Error("알 수 없는 presigned 응답 형식입니다.");
}
