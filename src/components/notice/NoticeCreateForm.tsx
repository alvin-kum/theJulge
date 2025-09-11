import React, { useState } from "react";
import { useRouter } from "next/router";
import Textarea from "@/components/FormInput/Textarea";
import AlertModal from "@/components/Modal/AlertModal";
import { StyledInput } from "../FormInput/styles";
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

export default function NoticeCreateForm() {
  const router = useRouter();

  const [hourlyPay, setHourlyPay] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [workHour, setWorkHour] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHourlyPayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    if (rawValue.length > 10) return;
    setHourlyPay(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  };

  const handleStartsAtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "").slice(0, 12);
    let formatted = value;
    if (value.length >= 4) formatted = value.slice(0, 4) + "-" + value.slice(4);
    if (value.length >= 6) formatted = formatted.slice(0, 7) + "-" + formatted.slice(7);
    if (value.length >= 8) formatted = formatted.slice(0, 10) + " " + formatted.slice(10);
    if (value.length >= 10) formatted = formatted.slice(0, 13) + ":" + formatted.slice(13);
    setStartsAt(formatted);
  };

  const handleWorkHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkHour(e.target.value.replace(/[^0-9]/g, "").slice(0, 10));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value.slice(0, 1000));
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
          <InputWrapper>
            <FieldLabel>시급*</FieldLabel>
            <InputInnerWrapper>
              <StyledInput
                type="text"
                value={hourlyPay}
                onChange={handleHourlyPayChange}
                required
              />
              <UnitLabel>원</UnitLabel>
            </InputInnerWrapper>
          </InputWrapper>

          <InputWrapper>
            <FieldLabel>시작 일시*</FieldLabel>
            <StyledInput type="text" value={startsAt} onChange={handleStartsAtChange} required />
          </InputWrapper>

          <InputWrapper>
            <FieldLabel>업무 시간*</FieldLabel>
            <InputInnerWrapper>
              <StyledInput
                type="text"
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
            <Textarea value={description} onChange={handleDescriptionChange} />
          </InputWrapper>


        <ButtonWrapper>
          <SubmitButton type="submit">등록하기</SubmitButton>
        </ButtonWrapper>
      </Form>

      {isModalOpen && <AlertModal message="등록이 완료되었습니다." onConfirm={handleConfirm} />}
    </Container>
  );
}
