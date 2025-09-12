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
import Button from "@/components/Button/CustomButton";
import HourlyPayBadge from "@/components/HourlyPayBadge";
import {
  getMyApplicationForNotice,
  type ApplicationStatus,
} from "@/lib/api/applications";
import { isLoggedIn, goLoginWithReturn } from "@/lib/api/client";
import { applyNotice, cancelNotice } from "@/lib/api/apply";
import { fetchMyInfo } from "@/lib/api/user";
import { hasProfileFilled } from "@/utils/checkProfile";
import { useRouter } from "next/router";
import Modal from "@/components/Modal/Modal";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

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
  const router = useRouter();
  // state 추가 (파일 상단의 다른 useState들 옆에)
  const [applicationId, setApplicationId] = useState<string | null>(null);

  // 공고별로 보관할 storage key
  const storageKey = `applicationId_${noticeId}`;
  const userType = localStorage.getItem("userType");
  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState<"login" | "profile" | "info">(
    "info"
  );
  const [modalText, setModalText] = useState("");
  const [applyStatus, setApplyStatus] = useState<
    "none" | "pending" | "accepted" | "rejected" | "canceled"
  >("none");

  const openModal = (kind: "login" | "profile" | "info", text: string) => {
    setModalMsg(kind);
    setModalText(text);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleModalClose = () => {
    setModalOpen(false);
    if (modalMsg === "login") {
      // 로그인 필요 → 로그인 후 복귀
      goLoginWithReturn(router.asPath);
    } else if (modalMsg === "profile") {
      // 프로필 필요 → 프로필 작성 화면으로
      router.push("/profile"); // 필요 시 '/profile/edit' 등으로 수정
    }
  };

  // 신청 핸들러
  const applyHandler = async () => {
    // 1) 로그인 가드
    if (!isLoggedIn()) {
      openModal("login", "로그인이 필요합니다.");
      return;
    }

    // 2) 프로필 확인
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        openModal("login", "로그인 정보가 올바르지 않습니다.");
        return;
      }

      const me = await fetchMyInfo(userId); // { id, email, type, name, phone, address, bio... }
      if (!hasProfileFilled(me)) {
        openModal("profile", "내 프로필을 먼저 등록해 주세요.");
        return;
      }
    } catch (e: unknown) {
      const err = e as AxiosError<{ message?: string }>;
      openModal(
        "info",
        err.response?.data?.message || "내 정보 조회 중 오류가 발생했습니다."
      );
      return;
    }

    // 3) 신청 API
    try {
      const created = await applyNotice(shopId, noticeId);
      // created가 { item: { id: string } } 형태라면:
      const newId = (created as any)?.item?.id ?? (created as any)?.id;

      setApplyStatus("pending");
      if (newId) {
        setApplicationId(newId);
        localStorage.setItem(storageKey, String(newId));
      }

      openModal("info", "신청이 완료되었습니다.");
    } catch (e: unknown) {
      const err = e as AxiosError<{ message?: string }>;
      openModal(
        "info",
        err.response?.data?.message || "신청 중 오류가 발생했습니다."
      );
      console.error("[applyNotice] error:", err);
    }
  };

  const cancelHandler = async () => {
    // state 우선, 없으면 storage에서
    const id = applicationId || localStorage.getItem(storageKey);
    if (!id) {
      openModal("info", "신청 ID를 찾을 수 없습니다.");
      return;
    }
    try {
      await cancelNotice(shopId, noticeId, id);
      setApplyStatus("canceled");
      setApplicationId(null);
      localStorage.removeItem(storageKey);
      openModal("info", "신청이 취소되었습니다.");
    } catch (e: unknown) {
      const err = e as AxiosError<{ message?: string }>;
      openModal("info", "취소 중 오류가 발생했습니다.");
      console.error("[applyNotice] error:", err);
    }
  };

  const renderApplyButton = () => {
    if (isClosed) {
      return (
        <Button
          size="fill"
          color="primary"
          disabled={true}
          handleClick={() => {}}
          text="신청 불가"
        />
      );
    }

    if (userType === "employer") {
      return (
        <Button
          size="fill"
          color="primary"
          disabled={true}
          handleClick={() => {}}
          text="사장님은 신청하실 수 없습니다."
        />
      );
    }

    switch (applyStatus) {
      case "pending": // 신청 완료 → 취소 가능
        return (
          <Button
            size="fill"
            color="secondary"
            disabled={false}
            handleClick={cancelHandler}
            text="취소하기"
          />
        );

      case "canceled": // 취소됨 → 다시 신청 가능
        return (
          <Button
            size="fill"
            color="primary"
            disabled={false}
            handleClick={applyHandler}
            text="다시 신청하기"
          />
        );

      case "accepted": // 사장님이 승인한 상태
        return (
          <Button
            size="fill"
            color="primary"
            disabled={true}
            handleClick={() => {}}
            text="승인 완료"
          />
        );

      case "rejected": // 거절당한 상태 → 다시 신청 가능하게 만들 수도 있음
        return (
          <Button
            size="fill"
            color="primary"
            disabled={true}
            handleClick={() => {}}
            text="거절되었습니다."
          />
        );

      default: // none (아직 신청 전)
        return (
          <Button
            size="fill"
            color="primary"
            disabled={false}
            handleClick={applyHandler}
            text="신청하기"
          />
        );
    }
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

  useEffect(() => {
    // 필수 파라미터 없으면 패스
    if (!shopId || !noticeId) return;

    // 로그인 안되어 있으면 초기화
    if (!isLoggedIn()) {
      setApplyStatus("none");
      setApplicationId(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem(storageKey);
      }
      return;
    }

    // 로그인 되어있으면 userId로 내 신청 찾기
    const userId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    if (!userId) {
      setApplyStatus("none");
      setApplicationId(null);
      return;
    }

    (async () => {
      try {
        const myApp = await getMyApplicationForNotice(shopId, noticeId, userId);
        if (myApp) {
          setApplyStatus(myApp.status); // "pending" | "accepted" | "rejected" | "canceled"
          setApplicationId(myApp.id);
          // 공고별 applicationId 저장 (새로고침 복원용)
          localStorage.setItem(storageKey, myApp.id);
        } else {
          setApplyStatus("none");
          setApplicationId(null);
          localStorage.removeItem(storageKey);
        }
      } catch (e) {
        console.error("[getMyApplicationForNotice] error:", e);
        // 실패 시 초기화
        setApplyStatus("none");
        setApplicationId(null);
      }
    })();
  }, [shopId, noticeId]); // 공고가 바뀌면 다시 조회

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
            {renderApplyButton()}
          </ContentBox>
        </InfoBox>

        <NoticeDescWrap>
          <NoticeDescHeader>공고 설명</NoticeDescHeader>
          <NoticeDescContent>
            {noticeDesc || "설명이 없습니다."}
          </NoticeDescContent>
        </NoticeDescWrap>
        {/* 모달 */}
        {modalOpen && <Modal message={modalText} onClose={handleModalClose} />}
      </>
    </Wrap>
  );
}

export default NoticeInfoCard;
