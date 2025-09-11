// src/components/notice/NoticeCreateForm.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import Textarea from "@/components/FormInput/Textarea";
import AlertModal from "@/components/Modal/AlertModal";
import { StyledInput } from "../FormInput/styles";
import { apiClient } from "@/lib/api/client";
import {
  Container,
  Title,
  Form,
  FormFields,
  ButtonWrapper,
  SubmitButton,
  FieldLabel,
  UnitLabel,
  InputWrapper,
  InputInnerWrapper,
} from "./NoticeCreateForm.styles";

/** "YYYY-MM-DD HH:mm" → RFC3339(Asia/Seoul) */
const toRFC3339 = (local: string) => {
  const trimmed = local.trim();
  // 2025-09-12 18:30 형태만 허용
  if (!/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/.test(trimmed)) return null;
  // 초는 00, KST +09:00 고정
  return trimmed.replace(" ", "T") + ":00+09:00";
};

export default function NoticeCreateForm() {
  const router = useRouter();

  const [hourlyPay, setHourlyPay] = useState("");
  const [startsAt, setStartsAt] = useState("");       // "YYYY-MM-DD HH:mm"
  const [workHour, setWorkHour] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handleHourlyPayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    if (rawValue.length > 10) return;
    setHourlyPay(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  };

  const handleStartsAtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/[^\d]/g, "").slice(0, 12); // YYYYMMDDHHmm
    let out = digits;
    if (digits.length >= 4) out = digits.slice(0, 4) + "-" + digits.slice(4);
    if (digits.length >= 6) out = out.slice(0, 7) + "-" + out.slice(7);
    if (digits.length >= 8) out = out.slice(0, 10) + " " + out.slice(10);
    if (digits.length >= 10) out = out.slice(0, 13) + ":" + out.slice(13);
    setStartsAt(out);
  };

  const handleWorkHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkHour(e.target.value.replace(/[^0-9]/g, "").slice(0, 10));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value.slice(0, 1000));
  };

  const validate = () => {
    if (!hourlyPay) return "시급을 입력해 주세요.";
    if (!startsAt || !/^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/.test(startsAt)) {
      return '시작 일시는 "YYYY-MM-DD HH:mm" 형식으로 입력해 주세요.';
    }
    if (!workHour) return "업무 시간을 입력해 주세요.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);

    // shopId: 쿼리 우선, 없으면 localStorage
    const shopIdFromQuery = router.query.shopId as string | undefined;
    const shopId =
      shopIdFromQuery ||
      (typeof window !== "undefined" ? localStorage.getItem("myShopId") || "" : "");

    if (!shopId) {
      alert("가게 식별값(shopId)이 없습니다. /shop에서 다시 시도해 주세요.");
      return;
    }

    const startsAtRFC3339 = toRFC3339(startsAt);
    if (!startsAtRFC3339) {
      alert('시작 일시는 "YYYY-MM-DD HH:mm" 형식으로 입력해 주세요.');
      return;
    }

    // ✅ 인증 토큰/계정 타입 확인
    const token =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const userType =
      typeof window !== "undefined" ? localStorage.getItem("userType") : null;

    if (!token) {
      alert("로그인이 필요합니다.");
      router.replace("/login");
      return;
    }
    if (userType !== "employer") {
      alert("사장님(고용주) 계정으로만 공고를 등록할 수 있어요.");
      router.replace("/shop");
      return;
    }

    const payload = {
      hourlyPay: Number(hourlyPay.replace(/,/g, "")),
      startsAt: startsAtRFC3339,      // RFC3339로 변환된 값
      workhour: Number(workHour),     // 스펙 키 이름 주의: workhour (소문자 h)
      description,
    };

    try {
      setPending(true);

      // ✅ 토큰을 직접 헤더에 첨부(프로젝트의 apiClient가 토큰을 자동첨부하지 않는 케이스 방지)
      await apiClient.post(`/shops/${shopId}/notices`, payload, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsModalOpen(true);

      // ✅ 등록 성공 후 이동 경로: 상세 페이지가 /notice/{shopId}/notices/{noticeId} 라우트일 때
      (handleConfirm as any)._next = (noticeId?: string) => {
        // 서버 응답 스펙에 따라 item.id를 못 받는 경우가 있으므로, 성공 시에는 목록으로 fallback
        if (noticeId) router.push(`/notice/${shopId}/notices/${noticeId}`);
        else router.push(`/shop/manage?id=${shopId}`);
      };
    } catch (error: any) {
      console.error(error);
      const status = error?.response?.status;
      if (status === 403) {
        alert("권한이 없습니다. 사장님 계정으로 로그인했는지, 그리고 내 가게에 등록 중인지 확인해 주세요.");
      } else {
        alert(error?.response?.data?.message || "공고 등록에 실패했습니다.");
      }
    } finally {
      setPending(false);
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    if ((handleConfirm as any)._next) (handleConfirm as any)._next();
    else router.push("/shop");
  };

  return (
    <Container>
      <Title>공고 등록</Title>

      <Form onSubmit={handleSubmit}>
        <FormFields>
          <InputWrapper>
            <FieldLabel>시급*</FieldLabel>
            <InputInnerWrapper>
              <StyledInput
                type="text"
                inputMode="numeric"
                value={hourlyPay}
                onChange={handleHourlyPayChange}
                required
              />
              <UnitLabel>원</UnitLabel>
            </InputInnerWrapper>
          </InputWrapper>

          <InputWrapper>
            <FieldLabel>시작 일시*</FieldLabel>
            <StyledInput
              type="text"
              placeholder="2025-09-12 18:30"
              value={startsAt}
              onChange={handleStartsAtChange}
              required
            />
          </InputWrapper>

          <InputWrapper>
            <FieldLabel>업무 시간*</FieldLabel>
            <InputInnerWrapper>
              <StyledInput
                type="text"
                inputMode="numeric"
                value={workHour}
                onChange={handleWorkHourChange}
                required
              />
              <UnitLabel>시간</UnitLabel>
            </InputInnerWrapper>
          </InputWrapper>
        </FormFields>

        <InputWrapper>
          <FieldLabel>공고 설명</FieldLabel>
          <Textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="업무 내용, 준비물, 유의사항 등을 적어 주세요."
          />
        </InputWrapper>

        <ButtonWrapper>
          <SubmitButton type="submit" disabled={pending}>
            {pending ? "등록 중..." : "등록하기"}
          </SubmitButton>
        </ButtonWrapper>
      </Form>

      {isModalOpen && (
        <AlertModal message="등록이 완료되었습니다." onConfirm={handleConfirm} />
      )}
    </Container>
  );
}
