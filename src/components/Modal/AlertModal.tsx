import React, { useEffect } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalMessage,
  ConfirmButton,
} from "./AlertModal.styles";

interface AlertModalProps {
  message: string;
  onConfirm: () => void;
}

export default function AlertModal({ message, onConfirm }: AlertModalProps) {
  useEffect(() => {
    // 모달 열 때 스크롤 막기
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    // 모달 닫힐 때 원래 스타일 복원
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalMessage>{message}</ModalMessage>
        <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
      </ModalContent>
    </ModalOverlay>
  );
}
