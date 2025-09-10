// src/pages/notice/[id].tsx
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NoticeInfoCard from "../../../../components/notice/noticeInfoCard";
import { getShopNotice, type Notice } from "@/lib/api/notice";
import { AxiosError } from "axios";
import { addNewNotice } from "@/utils/recentNotice";

const BREAKPOINTS = {
  mobile: 767, // ≤ 767
  tablet: 1199, // 768 ~ 1199
  // desktop: ≥ 1200
};

// SSR 문제 분리용: 필요 없으면 { ssr: true } 또는 그냥 일반 import로 바꿔도 됩니다.
// const NoticeInfoCard = dynamic(
//   () => import("@/components/notice/noticeInfoCard"),
//   { ssr: true }
// );
export default function NoticeDetailPage() {
  const { query } = useRouter();
  const shopId = typeof query.shopId === "string" ? query.shopId : "";
  const noticeId = typeof query.noticeId === "string" ? query.noticeId : "";

  const applicants = [
    {
      name: "김지원",
      phone: "010-1234-5678",
      appliedAt: "2025-09-01",
      memo: "주말 장기 가능",
      status: "대기",
    },
    {
      name: "이서연",
      phone: "010-2222-3344",
      appliedAt: "2025-09-02",
      memo: "근거리 거주",
      status: "대기",
    },
    {
      name: "박현우",
      phone: "010-7777-8888",
      appliedAt: "2025-09-03",
      memo: "경력 有",
      status: "대기",
    },
    {
      name: "최유진",
      phone: "010-9999-0000",
      appliedAt: "2025-09-03",
      memo: "오픈/마감 가능",
      status: "대기",
    },
  ];

  // const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [notice, setNotice] = useState<Notice | undefined>();

  // 클라이언트 마운트 여부 (날짜 포맷 SSR 불일치 방지)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!shopId || !noticeId) return;
    (async () => {
      try {
        // setLoading(true);
        const item = await getShopNotice(shopId, noticeId);
        setNotice(item);
        // 콘솔 출력
        console.log("[NoticeInfoCard] notice:", item);

        if (item?.shop?.item)
          console.log("[NoticeInfoCard] shop:", item.shop.item);
      } catch (e: unknown) {
        const err = e as AxiosError<{ message?: string }>;
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "공고 정보를 불러오지 못했습니다.";
        setErr(String(msg));
        console.error("[NoticeInfoCard] error:", e);
      } finally {
        // setLoading(false);
      }
    })();
  }, [shopId, noticeId]);

  // 표시용 파생값
  const shopItem = notice?.shop?.item;
  const category = shopItem?.category ?? "분류";
  const shopName = shopItem?.name ?? "가게명";
  const imageUrl =
    shopItem?.imageUrl || "https://placehold.co/800x600?text=No+Image";
  const hourlyPay = notice?.hourlyPay ?? 0;
  const isClosed = notice?.closed ?? false;
  const shopDesc = shopItem?.description ?? "";
  const noticeDesc = notice?.description ?? "";
  const address = [shopItem?.address1, shopItem?.address2]
    .filter(Boolean)
    .join(" ");
  const startsAtText = notice?.startsAt ?? "";
  const workHourText = notice?.workhour ?? 0;
  // const wagePercentage = notice?.wagePercentage ?? 0;

  if (err) return <p>{err}</p>;
  if (!notice) return <p>불러오는 중...</p>;

  if (!notice) {
    return null;
  }

  addNewNotice(notice);

  if (!shopId || !noticeId)
    return <div style={{ padding: 24 }}>잘못된 경로</div>;

  return (
    <Wrap>
      <NoticeInfoCard
        shopId={shopId as string}
        noticeId={noticeId as string}
        category={category}
        shopName={shopName}
        imageUrl={imageUrl}
        hourlyPay={hourlyPay}
        isClosed={isClosed}
        shopDesc={shopDesc}
        noticeDesc={noticeDesc}
        address={address}
        startsAtText={startsAtText}
        workHourText={workHourText}
      />

      <Section>
        {/* <SectionTitle>신청자 목록</SectionTitle> */}

        {/* 데스크탑/태블릿: 테이블, 모바일: 카드 리스트 */}
        {/* <ApplicantsCard>
          <ApplicantsTable>
            <thead>
              <tr>
                <th>이름</th>
                <th className="hide-mobile">메모</th>
                <th>연락처</th>
                <th className="hide-mobile">신청일</th>
                <th>상태</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((a, i) => (
                <tr key={i}>
                  <td>{a.name}</td>
                  <td className="hide-mobile">{a.memo}</td>
                  <td>{a.phone}</td>
                  <td className="hide-mobile">{a.appliedAt}</td>
                  <td>
                    <Chip tone="muted">{a.status}</Chip>
                  </td>
                  <td>
                    <RowActions>
                      <SmallButton>승인</SmallButton>
                      <SmallGhost>거절</SmallGhost>
                    </RowActions>
                  </td>
                </tr>
              ))}
            </tbody>
          </ApplicantsTable>

          <ApplicantsCards>
            {applicants.map((a, i) => (
              <ApplicantCard key={i}>
                <CardHeader>
                  <strong>{a.name}</strong>
                  <Chip tone="muted">{a.status}</Chip>
                </CardHeader>
                <CardKV>
                  <span>연락처</span>
                  <b>{a.phone}</b>
                </CardKV>
                <CardKV>
                  <span>신청일</span>
                  <b>{a.appliedAt}</b>
                </CardKV>
                <CardKV>
                  <span>메모</span>
                  <b>{a.memo}</b>
                </CardKV>
                <RowActions style={{ marginTop: 12 }}>
                  <SmallButton>승인</SmallButton>
                  <SmallGhost>거절</SmallGhost>
                </RowActions>
              </ApplicantCard>
            ))}
          </ApplicantsCards>

          <Pagination>
            <button aria-label="이전 페이지" className="ghost">
              ‹
            </button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button aria-label="다음 페이지" className="ghost">
              ›
            </button>
          </Pagination>
        </ApplicantsCard> */}
      </Section>
    </Wrap>
  );
}

/* ================= 유틸 ================= */
function formatKST(iso: string) {
  try {
    const d = new Date(iso);
    // 한국시간으로 YYYY.MM.DD HH:mm 형식
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
  } catch {
    return "";
  }
}

/* ======================= styled ======================= */

const Wrap = styled.div`
  --text: var(--color-text, #111827);
  --border: var(--color-border, #e5e7eb);
  --accent: var(--color-accent, #ff6b3d);
  --muted: #6b7280;
  --bg: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 16px 64px;
  color: var(--text);
`;

const Chip = styled.span<{ tone?: "primary" | "muted" }>`
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid
    ${({ tone }) => (tone === "primary" ? "var(--accent)" : "var(--border)")};
  color: ${({ tone }) => (tone === "primary" ? "var(--accent)" : "#374151")};
  background: ${({ tone }) => (tone === "primary" ? "#fff5ef" : "#fff")};
`;

const Section = styled.section`
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 18px;
`;

const ApplicantsCard = styled.div`
  padding: 4px;
`;

const ApplicantsTable = styled.table`
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

  .hide-mobile {
    @media (max-width: ${BREAKPOINTS.mobile}px) {
      display: none;
    }
  }

  /* 모바일에서는 테이블 자체를 숨기고 카드로 대체 */
  @media (max-width: ${BREAKPOINTS.mobile}px) {
    display: none;
  }
`;

const ApplicantsCards = styled.div`
  display: none;

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    display: grid;
    gap: 10px;
  }
`;

const ApplicantCard = styled.div`
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 12px;
  background: #fff;
  font-size: 14px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;

  strong {
    font-weight: 700;
  }
`;

const CardKV = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 8px;
  margin-top: 6px;

  span {
    color: var(--muted);
  }
`;

const Pagination = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-top: 12px;

  button {
    min-width: 32px;
    height: 32px;
    padding: 0 10px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: #fff;
    cursor: default; /* 기능 없음 */
  }
  button.active {
    background: #fff5ef;
    border-color: var(--accent);
    color: var(--accent);
    font-weight: 700;
  }
  button.ghost {
    color: #6b7280;
  }
`;

/* ------- Buttons ------- */
const PrimaryButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  font-weight: 600;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #fff;
  cursor: default; /* 기능 제거 */

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    height: 36px;
  }
`;

const GhostButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;
  font-weight: 600;
  border: 1px solid var(--border);
  background: #fff;
  color: #374151;
  cursor: default;

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    height: 36px;
  }
`;

const RowActions = styled.div`
  display: inline-flex;
  gap: 6px;
`;

const SmallButton = styled(PrimaryButton)`
  height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 13px;
`;

const SmallGhost = styled(GhostButton)`
  height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 13px;
`;
