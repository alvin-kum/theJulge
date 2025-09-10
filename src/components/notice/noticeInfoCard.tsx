// src/components/NoticeInfo/NoticeInfo.tsx
import Image from "next/image";

import {
  Wrap,
  HeaderBox,
  Category,
  ShopName,
  InfoBox,
  ImageBox,
  StyledImage,
  Section,
  HourBox,
  AddressBox,
  ContentBox,
  Label,
  Row,
  Note,
  Subnote,
  ValueBig,
  CloseNotice,
  NoticeDescContent,
  NoticeDescHeader,
  NoticeDescWrap,
} from "./noticeInfoCard.styles";
import Button from "../Button";
import HourlyPayBadge from "@/components/HourlyPayBadge";

interface Props {
  shopId: string;
  noticeId: string;
  category?: string;
  shopName?: string;
  imageUrl?: string;
  hourlyPay?: number;
  originalHourlyPay?: number;
  isClosed?: boolean;
  shopDesc?: string;
  noticeDesc?: string;
  address?: string;
  startsAtText?: string;
  workHourText?: number;
  // wagePercentage?: number; // 시급 인상률 (예: 10 -> 10%)
}

function NoticeInfoCard({
  shopId,
  noticeId,
  category,
  shopName,
  imageUrl,
  hourlyPay = 0,
  originalHourlyPay = 0,
  shopDesc = "",
  noticeDesc = "",
  address = "",
  startsAtText = "",
  workHourText = 0,
}: Props) {
  const applyHandler = () => {
    console.log("신청하기 클릭");
  };
  /** 시작일 Date 객체 (UTC 대신 로컬 기준으로 파싱) */
  const startDate = new Date(startsAtText.replace("Z", ""));

  /** 종료시간 계산 */
  const endDate = new Date(startDate.getTime() + workHourText * 60 * 60 * 1000);

  /** 시작시간 포맷: yyyy-mm-dd HH:mm */
  const formatStartDateTime = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  };

  /** 종료시간 포맷: HH:mm */
  const formatEndTime = (date: Date) => {
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${hh}:${min}`;
  };

  /** 근무시간 표시: 정수면 소수점 제거, 소수면 1자리 */
  const formatDuration = (hours: number) =>
    hours % 1 === 0 ? `${hours}시간` : `${Number(hours).toFixed(1)}시간`;

  const isClosed = startDate < new Date();

  const hourlyPayPercentage = originalHourlyPay
    ? Math.round(((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100)
    : 0;
  console.log({ hourlyPayPercentage });
  return (
    <Wrap>
      <>
        <HeaderBox>
          <Category>{category}</Category>
          <ShopName>{shopName}</ShopName>
        </HeaderBox>

        <InfoBox>
          <ImageBox>
            <StyledImage
              fill
              src={imageUrl || "/images/default-image.png"}
              alt={shopName || "가게 이미지"}
              $dimmed={isClosed}
            />
            {isClosed && <CloseNotice>마감 완료</CloseNotice>}
          </ImageBox>

          <ContentBox>
            <Section>
              <Label>시급</Label>
              <Row>
                <ValueBig>{hourlyPay.toLocaleString()}원</ValueBig>
                <HourlyPayBadge
                  percentage={hourlyPayPercentage}
                  isClosed={isClosed}
                />
              </Row>
            </Section>

            <HourBox>
              <Image
                src="/images/Postcard/clock.svg"
                width={20}
                height={20}
                alt="운영시간"
              />
              <Subnote>
                {formatStartDateTime(startDate)} ~ {formatEndTime(endDate)} (
                {formatDuration(workHourText)})
              </Subnote>
              {/* <Subnote>({workhourText})</Subnote> */}
            </HourBox>

            <AddressBox>
              <Image
                src="/images/Postcard/address1.svg"
                width={20}
                height={20}
                alt="운영시간"
              />
              <Subnote>{address}</Subnote>
            </AddressBox>

            <Section>
              <Note>{shopDesc || "설명이 없습니다."}</Note>
            </Section>
            <Button onClick={applyHandler}>신청하기</Button>
          </ContentBox>
        </InfoBox>

        <NoticeDescWrap>
          <NoticeDescHeader>공고 설명</NoticeDescHeader>
          <NoticeDescContent>
            {noticeDesc || "설명이 없습니다."}
          </NoticeDescContent>
        </NoticeDescWrap>
      </>
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
