import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  PageWrapper,
  ProfileContainer,
  Title,
  FormRow,
  InputField,
  TextArea,
  ButtonWrapper,
  SubmitButton,
  Label,
  CloseButton,
} from "@/styles/profileEdit.styles";

import Modal from "@/components/Modal/Modal";
import { updateMyProfile, fetchMyInfo } from "../../lib/api/user";

export default function ProfileEditPage() {
  const router = useRouter();

  // 상태 관리
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false); // ✅ 수정/등록 모드 구분

  // ✅ 페이지 로드 시 기존 정보 불러오기
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    fetchMyInfo(userId)
      .then((data) => {
        setName(data.name || "");
        setPhone(data.phone || "");
        setRegion(data.address || "");
        setDescription(data.bio || "");

        // ✅ 이름과 연락처가 있으면 수정 모드로 판단
        const editing = Boolean(data.name && data.phone);
        setIsEditMode(editing);
      })
      .catch((err) => {
        console.error("내 프로필 불러오기 실패", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async () => {
    if (!name || !phone) {
      alert("이름과 연락처는 필수입니다.");
      return;
    }

    try {
      await updateMyProfile({
        name,
        phone,
        address: region,
        bio: description,
      });

      setIsModalOpen(true); // ✅ 등록 또는 수정 성공 시 모달 열기
    } catch (err) {
      console.error("프로필 저장 실패", err);
      alert("프로필 저장에 실패했습니다.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/profile");
  };

  if (loading) return <p style={{ textAlign: "center" }}>불러오는 중...</p>;

  return (
    <PageWrapper>
      <ProfileContainer>
        <CloseButton onClick={() => router.push("/profile")}>×</CloseButton>

        <Title>내 프로필</Title>

        <FormRow>
          <div>
            <Label>이름*</Label>
            <InputField
              placeholder="입력"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label>연락처*</Label>
            <InputField
              placeholder="입력"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <Label>선호 지역</Label>
            <InputField
              as="select"
              value={region}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRegion(e.target.value)}
            >
              <option value="">선택</option>
              <option>서울시 강남구</option>
              <option>서울시 강동구</option>
              <option>서울시 강북구</option>
              <option>서울시 강서구</option>
              <option>서울시 관악구</option>
              <option>서울시 광진구</option>
              <option>서울시 구로구</option>
              <option>서울시 금천구</option>
              <option>서울시 노원구</option>
              <option>서울시 도봉구</option>
              <option>서울시 동대문구</option>
              <option>서울시 동작구</option>
              <option>서울시 마포구</option>
              <option>서울시 서대문구</option>
              <option>서울시 서초구</option>
              <option>서울시 성동구</option>
              <option>서울시 성북구</option>
              <option>서울시 송파구</option>
              <option>서울시 양천구</option>
              <option>서울시 영등포구</option>
              <option>서울시 용산구</option>
              <option>서울시 은평구</option>
              <option>서울시 종로구</option>
              <option>서울시 중구</option>
              <option>서울시 중랑구</option>
            </InputField>
          </div>
        </FormRow>

        <div>
          <Label>소개</Label>
          <TextArea
            placeholder="입력"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          />
        </div>

        <ButtonWrapper>
          <SubmitButton onClick={handleSubmit}>
            {isEditMode ? "수정하기" : "등록하기"}
          </SubmitButton>
        </ButtonWrapper>
      </ProfileContainer>

      {isModalOpen && (
        <Modal
          message={isEditMode ? "수정이 완료되었습니다." : "등록이 완료되었습니다."}
          onClose={handleCloseModal}
        />
      )}
    </PageWrapper>
  );
}
