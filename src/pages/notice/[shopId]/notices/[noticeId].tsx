// src/pages/notice/[id].tsx
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NoticeInfoCard from "../../../../components/notice/noticeInfoCard";
import { getShopNotice, type Notice } from "@/lib/api/notice";
import { AxiosError } from "axios";
import { addNewNotice } from "@/utils/recentNotice";
import NoticeRecent from "@/components/notice/noticeRecent/noticeRecent";

const BREAKPOINTS = {
  mobile: 767, // ≤ 767
  tablet: 1199, // 768 ~ 1199
  // desktop: ≥ 1200
};

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
    <>
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
      </Wrap>
      <Section>
        <NoticeRecent />
      </Section>
    </>
  );
}

/* ======================= styled ======================= */

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 1100px;
`;
