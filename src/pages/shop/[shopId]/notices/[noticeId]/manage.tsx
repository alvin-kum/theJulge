import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "@/components/Modal/Modal";

// ✅ 당신 프로젝트의 API 경로에 맞게 import
import { getShopNotice } from "@/lib/api/notice"; // (shopId, noticeId) → notice item
import {
  getApplicationsByNotice,
  updateApplicationStatus,
  type Application,
} from "@/lib/api/applications"; // 위에서 정리했던 파일

export default function EmployerNoticeManagePage() {
  const router = useRouter();
  const { shopId, noticeId } = router.query as {
    shopId?: string;
    noticeId?: string;
  };

  // 권한/로딩/에러
  const [checking, setChecking] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  // 공고/지원 목록
  const [notice, setNotice] = useState<any>(null);
  const [apps, setApps] = useState<Application[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);

  // 모달
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const openModal = (msg: string) => {
    setModalText(msg);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  /* ---------------------------------------------------------
     1) 권한 가드: localStorage.userType 으로 판별
     - accessToken 없거나 userType !== "employer" 면 차단
     --------------------------------------------------------- */
  useEffect(() => {
    if (!shopId || !noticeId) return;

    if (typeof window === "undefined") return;
    const token = localStorage.getItem("accessToken");
    const userType = localStorage.getItem("userType"); // ✅ 로그인시 저장한 값 사용

    if (!token) {
      setForbidden(true);
      setChecking(false);
      openModal("로그인이 필요합니다.");
      return;
    }
    if (userType !== "employer") {
      setForbidden(true);
      setChecking(false);
      openModal("사장님 계정으로만 접근 가능합니다.");
      return;
    }

    setForbidden(false);
    setChecking(false);
  }, [shopId, noticeId]);

  /* ---------------------------------------------------------
     2) 데이터 패칭
     - offset 속성이 응답에 없더라도 nextOffset으로 상태 유지
     - hasNext 없으면 items.length === limit 로 추정
     --------------------------------------------------------- */
  const loadData = async (nextOffset = 0) => {
    if (!shopId || !noticeId) return;
    setLoading(true);
    try {
      const n = await getShopNotice(shopId as string, noticeId as string);
      setNotice(n);

      const res = await getApplicationsByNotice(
        shopId as string,
        noticeId as string,
        { offset: nextOffset, limit }
      );

      const itemsArray = (res as any).items ?? [];
      const normalized: Application[] = itemsArray.map((x: any) => x.item ?? x);

      setApps(normalized);
      setOffset(nextOffset);

      const next =
        typeof (res as any).hasNext === "boolean"
          ? (res as any).hasNext
          : normalized.length === limit;
      setHasNext(next);
    } catch (e: any) {
      openModal(e?.response?.data?.message || "데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checking && !forbidden) loadData(0);
  }, [checking, forbidden, shopId, noticeId]);

  /* ---------------------------------------------------------
     3) 승인/거절 액션 (낙관적 업데이트)
     --------------------------------------------------------- */
  const handleUpdateStatus = async (
    applicationId: string,
    status: "accepted" | "rejected"
  ) => {
    if (!shopId || !noticeId) return;
    try {
      setApps((prev) =>
        prev.map((a) => (a.id === applicationId ? { ...a, status } : a))
      );
      await updateApplicationStatus(
        shopId as string,
        noticeId as string,
        applicationId,
        status
      );
      openModal(status === "accepted" ? "승인 완료" : "거절 완료");
    } catch (e: any) {
      await loadData(offset); // 실패 시 원복
      openModal(e?.response?.data?.message || "상태 변경 실패");
    }
  };

  if (checking) return <Wrap>확인 중...</Wrap>;
  if (forbidden)
    return (
      <Wrap>
        사장님 계정으로 로그인해 주세요.
        {modalOpen && <Modal message={modalText} onClose={closeModal} />}
      </Wrap>
    );
  if (!shopId || !noticeId) return <Wrap>잘못된 경로입니다.</Wrap>;

  return (
    <Wrap>
      {notice && (
        <Hero>
          <Thumb
            style={{
              backgroundImage: `url(${
                notice?.shop?.item?.imageUrl || "/images/default-image.png"
              })`,
            }}
          />
          <div>
            <Title>{notice?.shop?.item?.name || "가게명"}</Title>
            <Meta>
              <Row>
                <K>분류</K>
                <V>{notice?.shop?.item?.category ?? "-"}</V>
              </Row>
              <Row>
                <K>시급</K>
                <V>{(notice?.hourlyPay ?? 0).toLocaleString()}원</V>
              </Row>
              <Row>
                <K>주소</K>
                <V>{notice?.shop?.item?.address1 ?? "-"}</V>
              </Row>
              <Row>
                <K>공고상태</K>
                <Chip $tone={notice?.closed ? "muted" : "primary"}>
                  {notice?.closed ? "마감" : "모집중"}
                </Chip>
              </Row>
            </Meta>
          </div>
        </Hero>
      )}

      <Section>
        <SectionTitle>지원자 목록</SectionTitle>

        <Table>
          <thead>
            <tr>
              <th>지원일</th>
              <th>지원자</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a) => (
              <tr key={a.id}>
                <td>{new Date(a.createdAt).toLocaleString()}</td>
                <td>{a.user?.item?.id ?? "-"}</td>
                <td>
                  <Chip
                    $tone={
                      a.status === "pending"
                        ? "muted"
                        : a.status === "accepted"
                        ? "primary"
                        : a.status === "rejected"
                        ? "danger"
                        : "muted"
                    }
                  >
                    {a.status}
                  </Chip>
                </td>
                <td>
                  <RowActions>
                    <SmallButton
                      disabled={loading || a.status === "accepted"}
                      onClick={() => handleUpdateStatus(a.id, "accepted")}
                    >
                      승인
                    </SmallButton>
                    <SmallGhost
                      disabled={loading || a.status === "rejected"}
                      onClick={() => handleUpdateStatus(a.id, "rejected")}
                    >
                      거절
                    </SmallGhost>
                  </RowActions>
                </td>
              </tr>
            ))}
            {apps.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={4}
                  style={{ textAlign: "center", color: "#6b7280" }}
                >
                  지원자가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Pagination>
          <button
            onClick={() => loadData(Math.max(0, offset - limit))}
            disabled={loading || offset === 0}
            className="ghost"
          >
            ‹ 이전
          </button>
          <button
            onClick={() => loadData(offset + limit)}
            disabled={loading || !hasNext}
          >
            다음 ›
          </button>
        </Pagination>
      </Section>

      {modalOpen && <Modal message={modalText} onClose={closeModal} />}
    </Wrap>
  );
}

/* ======================= styled ======================= */
const Wrap = styled.div`
  --border: #e5e7eb;
  --accent: #ff6b3d;
  --muted: #6b7280;
  --text: #111827;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 16px 64px;
  color: var(--text);
`;
const Hero = styled.section`
  display: grid;
  grid-template-columns: 44% 1fr;
  gap: 24px;
  margin-bottom: 28px;
  @media (max-width: 1199px) {
    grid-template-columns: 1fr;
  }
`;
const Thumb = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  border: 1px solid var(--border);
`;
const Title = styled.h1`
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 800;
`;
const Meta = styled.div`
  display: grid;
  gap: 10px;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 8px;
  font-size: 14px;
`;
const K = styled.span`
  color: var(--muted);
`;
const V = styled.span`
  font-weight: 500;
`;

const Section = styled.section`
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
`;
const SectionTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 18px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  thead th {
    text-align: left;
    font-weight: 600;
    color: #374151;
    padding: 12px 10px;
    border-bottom: 1px solid var(--border);
    background: #fafafa;
  }
  tbody td {
    padding: 12px 10px;
    border-bottom: 1px solid var(--border);
    vertical-align: middle;
  }
`;
const Chip = styled.span<{ $tone?: "primary" | "muted" | "danger" }>`
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid
    ${({ $tone }) =>
      $tone === "primary"
        ? "var(--accent)"
        : $tone === "danger"
        ? "#ef4444"
        : "var(--border)"};
  color: ${({ $tone }) =>
    $tone === "primary"
      ? "var(--accent)"
      : $tone === "danger"
      ? "#b91c1c"
      : "#374151"};
  background: ${({ $tone }) =>
    $tone === "primary" ? "#fff5ef" : $tone === "danger" ? "#fef2f2" : "#fff"};
`;

const Pagination = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 12px;
  button {
    min-width: 80px;
    height: 32px;
    padding: 0 10px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: #fff;
  }
  .ghost {
    color: #6b7280;
  }
`;
const RowActions = styled.div`
  display: inline-flex;
  gap: 6px;
`;
const SmallButton = styled.button`
  height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 13px;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #fff;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const SmallGhost = styled.button`
  height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 13px;
  border: 1px solid var(--border);
  background: #fff;
  color: #374151;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
