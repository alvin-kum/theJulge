// src/components/NoticeInfo/NoticeInfo.tsx
import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { getShopNotice, type Notice } from "@/lib/api/notice";
import {
  Wrap,
  HeaderBox,
  Category,
  ShopName,
  InfoBox,
  ImageBox,
  StyledImage,
  Section,
  ShopRow,
  ContentBox,
  Label,
  Row,
  Value,
  ValueBig,
  CloseNotice,
} from "./noticeInfoCard.styles";

interface Props {
  shopId: string;
  noticeId: string;
}

function NoticeInfoCard({ shopId, noticeId }: Props) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [notice, setNotice] = useState<Notice | null>(null);

  // 클라이언트 마운트 여부 (날짜 포맷 SSR 불일치 방지)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const canFetch = !!shopId && !!noticeId;

  useEffect(() => {
    // if (!canFetch) return;
    if (!shopId || !noticeId) return;
    (async () => {
      try {
        setLoading(true);
        const item = await getShopNotice(shopId, noticeId);
        setNotice(item);

        // 콘솔 출력
        console.log("[NoticeInfoCard] notice:", item);
        if (item?.shop?.item)
          console.log("[NoticeInfoCard] shop:", item.shop.item);
      } catch (e: any) {
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          "공고 정보를 불러오지 못했습니다.";
        setErr(String(msg));
        console.error("[NoticeInfoCard] error:", e);
      } finally {
        setLoading(false);
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
  const desc = notice?.description ?? "";
  const address = [shopItem?.address1, shopItem?.address2]
    .filter(Boolean)
    .join(" ");

  // 날짜/시간 포맷 (mounted 이후에만 렌더)
  const startsAtText =
    mounted && notice?.startsAt ? formatKST(notice.startsAt) : ""; // 초기렌더엔 빈 문자열로 SSR/CSR 동일 유지

  const workhourText =
    notice?.workhour != null ? `${notice.workhour}시간` : "-";
  if (err) return <p>{err}</p>;
  if (!notice) return <p>불러오는 중...</p>;

  return (
    <Wrap>
      {/* {loading ? (
        <p>불러오는 중...</p>
      ) : err ? (
        <p style={{ color: "red" }}>{err}</p>
      ) : !notice ? (
        <p>공고가 없습니다.</p>
      ) : ( */}
      <>
        <HeaderBox>
          <Category>{category}</Category>
          <ShopName>{shopName}</ShopName>
        </HeaderBox>

        <InfoBox>
          <ImageBox>
            <StyledImage
              fill
              src={imageUrl}
              alt={shopName}
              $dimmed={isClosed}
            />
            {isClosed && <CloseNotice>마감 완료</CloseNotice>}
          </ImageBox>

          <ContentBox>
            <Section>
              <Label>시급</Label>
              <Row>
                <ValueBig>{hourlyPay.toLocaleString()}원</ValueBig>
              </Row>
            </Section>

            <Section>
              <Label>근무 시작</Label>
              <Value>{startsAtText || "-"}</Value>
            </Section>

            <Section>
              <Label>근무 시간</Label>
              <Value>{workhourText}</Value>
            </Section>

            <Section>
              <Label>주소</Label>
              <Value>{address || "-"}</Value>
            </Section>

            <Section>
              <Label>설명</Label>
              <Value>{desc || "설명이 없습니다."}</Value>
            </Section>
          </ContentBox>
        </InfoBox>
      </>
      {/* )} */}
    </Wrap>
  );
}

export default NoticeInfoCard;

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