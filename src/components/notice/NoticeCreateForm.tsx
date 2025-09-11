import React, { useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/FormInput";
import AlertModal from "@/components/Modal/AlertModal";
import {
  Container,
  Title,
  Form,
  FormFields,
  ButtonWrapper,
  SubmitButton,
} from "./NoticeCreateForm.styles";

export default function NoticeCreateForm() {
  const router = useRouter();
  const [hourlyPay, setHourlyPay] = useState("");
  const [startsAt, setStartsAt] = useState(""); 
  const [workHour, setWorkHour] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 시급 입력 처리
  const handleHourlyPayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    if (rawValue.length > 10) return;
    const formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setHourlyPay(formatted);
  };

  // 시작 일시 입력 처리
  const handleStartsAtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length > 12) value = value.slice(0, 12); // YYYYMMDDHHmm

    let formatted = value;
    if (value.length >= 4) formatted = value.slice(0, 4) + "-" + value.slice(4);
    if (value.length >= 6) formatted = formatted.slice(0, 7) + "-" + formatted.slice(7);
    if (value.length >= 8) formatted = formatted.slice(0, 10) + " " + formatted.slice(10);
    if (value.length >= 10) formatted = formatted.slice(0, 13) + ":" + formatted.slice(13);

    setStartsAt(formatted); // 상태 업데이트
  };

  // 업무 시간 입력 처리
  const handleWorkHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    if (rawValue.length > 10) return;
    setWorkHour(rawValue);
  };

  // 공고 설명 입력 처리
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setDescription(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      hourlyPay: hourlyPay.replace(/,/g, ""),
      startsAt,
      workHour,
      description,
    });

    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    router.push("/notice/1");
  };

  return (
    <Container>
      <Title>공고 등록</Title>

      <Form onSubmit={handleSubmit}>
        <FormFields>
          <Input
            label="시급*"
            type="text"
            value={hourlyPay}
            onChange={handleHourlyPayChange}
            unit="원"
            required
          />
          <Input
            label="시작 일시*"
            type="text"
            value={startsAt} 
            onChange={handleStartsAtChange} 
            required
          />
          <Input
            label="업무 시간*"
            type="text"
            value={workHour}
            onChange={handleWorkHourChange}
            unit="시간"
            required
          />
        </FormFields>

        <Input
          label="공고 설명"
          type="textarea"
          value={description}
          onChange={handleDescriptionChange}
        />

        <ButtonWrapper>
          <SubmitButton type="submit">등록하기</SubmitButton>
        </ButtonWrapper>
      </Form>

      {isModalOpen && (
        <AlertModal
          message="등록이 완료되었습니다."
          onConfirm={handleConfirm}
        />
      )}
    </Container>
  );
}
