import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import { apiClient } from "@/lib/api/client";
import { uploadImage } from "@/lib/api/image";

/* ===== Register UI와 동일한 스타일 ===== */

const Container = styled.div`
  min-height: 100vh;
  background: #fff;
`;

const Content = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  &:hover { color: #374151; }
`;

const FormCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 8px;
`;

const Required = styled.span`
  color: #ef4444;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  transition: all 0.2s;
  &:focus {
    outline: none;
    border-color: #ea580c;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
  }
  &::placeholder { color: #9ca3af; }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  &:focus {
    outline: none;
    border-color: #ea580c;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
  }
`;

const ImageUploadSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageUploadArea = styled.div`
  width: 100%;
  height: 276px;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #f9fafb;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  &:hover {
    border-color: #ea580c;
    background: #fef2f2;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const PreviewOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0,0,0,0.35);
  color: #fff;
  font-weight: 600;
  opacity: 0;
  transition: opacity .2s;
  ${ImageUploadArea}:hover & { opacity: 1; }
`;

const UploadIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #e5e7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 24px;
`;

const UploadText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  margin: 0 0 4px 0;
`;

const UploadSubtext = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const HiddenInput = styled.input`
  display: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  background: white;
  transition: all 0.2s;
  &:focus {
    outline: none;
    border-color: #ea580c;
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
  }
  &::placeholder { color: #9ca3af; }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #ea580c;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
  &:hover { background: #dc2626; }
  &:disabled { background: #9ca3af; cursor: not-allowed; }
`;

/* 숫자 입력 옆에 '원' 표시용 */
const InputAffix = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
  > span {
    display: inline-flex;
    align-items: center;
    height: 44px;
    padding: 0 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background: #f9fafb;
    color: #374151;
    font-size: 14px;
    font-weight: 600;
  }
`;

/* ===== 데이터/로직 ===== */

const categories = [
  "한식","중식","일식","양식","분식","카페","편의점","기타"
];

const seoulDistricts = [
  "서울시 종로구","서울시 중구","서울시 용산구","서울시 성동구","서울시 광진구",
  "서울시 동대문구","서울시 중랑구","서울시 성북구","서울시 강북구","서울시 도봉구",
  "서울시 노원구","서울시 은평구","서울시 서대문구","서울시 마포구","서울시 양천구",
  "서울시 강서구","서울시 구로구","서울시 금천구","서울시 영등포구","서울시 동작구",
  "서울시 관악구","서울시 서초구","서울시 강남구","서울시 송파구","서울시 강동구",
];

type ShopForm = {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
};

export default function ShopEdit() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [shopId, setShopId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [formData, setFormData] = useState<ShopForm>({
    name: "",
    category: "한식",
    address1: "",
    address2: "",
    description: "",
    imageUrl: "",
    originalHourlyPay: 10000,
  });

  /* shopId 결정: ?id= 우선, 없으면 localStorage */
  useEffect(() => {
    const decide = () => {
      const fromUrl = router.query.id as string | undefined;
      const saved =
        typeof window !== "undefined" ? localStorage.getItem("myShopId") || undefined : undefined;
      const finalId = fromUrl || saved;
      if (!finalId) {
        router.replace("/shop");
        return;
      }
      setShopId(finalId);
    };
    if (router.isReady) decide();
  }, [router.isReady, router.query.id, router]);

  /* 기존 데이터 로드 */
  useEffect(() => {
    if (!shopId) return;
    (async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/shops/${shopId}`);
        if (res?.item) {
          const data: ShopForm = {
            name: res.item.name || "",
            category: res.item.category || "한식",
            address1: res.item.address1 || "",
            address2: res.item.address2 || "",
            description: res.item.description || "",
            imageUrl: res.item.imageUrl || "",
            originalHourlyPay: res.item.originalHourlyPay || 10000,
          };
          setFormData(data);
          if (data.imageUrl) setImagePreview(data.imageUrl);
        }
      } catch (e) {
        console.error(e);
        alert("가게 정보를 불러오지 못했어요.");
        router.replace("/shop");
      } finally {
        setLoading(false);
      }
    })();
  }, [shopId, router]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "originalHourlyPay" ? Number(value) : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const url = await uploadImage(file);
      setImagePreview(url);
      setFormData(prev => ({ ...prev, imageUrl: url }));
    } catch (e) {
      console.error(e);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shopId) return alert("가게 식별값이 없어요.");
    if (!formData.name.trim()) return alert("가게 이름을 입력해 주세요.");
    if (!formData.address1.trim()) return alert("주소를 선택해 주세요.");
    if (!formData.address2.trim()) return alert("상세 주소를 입력해 주세요.");
    if (formData.originalHourlyPay < 9620)
      return alert("기본 시급은 최저시급(9,620원) 이상이어야 해요.");

    try {
      setLoading(true);
      await apiClient.put(`/shops/${shopId}`, formData);
      alert("가게 정보가 저장됐어요.");
      router.push(`/shop/manage?id=${shopId}`);
    } catch (e) {
      console.error(e);
      alert("저장에 실패했어요.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (confirm("변경사항이 저장되지 않을 수 있어요. 나가시겠어요?")) {
      if (shopId) router.push(`/shop/manage?id=${shopId}`);
      else router.push("/shop");
    }
  };

  return (
    <>
      <Head>
        <title>가게 정보 - THE JULGE</title>
        <meta name="description" content="가게 정보를 편집합니다." />
      </Head>
      <Container>
        <Content>
          <Header>
            <Title>가게 정보</Title>
            <CloseButton onClick={handleClose}>✕</CloseButton>
          </Header>

          <FormCard>
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label>가게 이름<Required>*</Required></Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    placeholder="입력"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>분류<Required>*</Required></Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={onChange}
                    required
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </Select>
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>주소<Required>*</Required></Label>
                  <Select
                    name="address1"
                    value={formData.address1}
                    onChange={onChange}
                    required
                  >
                    <option value="" disabled>선택</option>
                    {seoulDistricts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>상세 주소<Required>*</Required></Label>
                  <Input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={onChange}
                    placeholder="입력"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>기본 시급<Required>*</Required></Label>
                <InputAffix>
                  <Input
                    type="number"
                    name="originalHourlyPay"
                    value={formData.originalHourlyPay}
                    onChange={onChange}
                    placeholder="10000"
                    min={9620}
                    step={10}
                    required
                  />
                  <span>원</span>
                </InputAffix>
              </FormGroup>

              <FormGroup>
                <Label>가게 이미지</Label>
                <ImageUploadSection>
                  <ImageUploadArea onClick={() => document.getElementById("imageInput")?.click()}>
                    {imagePreview ? (
                      <>
                        <ImagePreview src={imagePreview} alt="가게 이미지 미리보기" />
                        <PreviewOverlay>이미지 변경하기</PreviewOverlay>
                      </>
                    ) : (
                      <>
                        <UploadIcon>📷</UploadIcon>
                        <UploadText>이미지 추가하기</UploadText>
                        <UploadSubtext>이미지를 클릭해서 파일을 첨부해 보세요</UploadSubtext>
                      </>
                    )}
                  </ImageUploadArea>
                  <HiddenInput
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </ImageUploadSection>
              </FormGroup>

              <FormGroup>
                <Label>가게 설명</Label>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={onChange}
                  placeholder="입력"
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? "저장 중..." : "완료하기"}
              </SubmitButton>
            </Form>
          </FormCard>
        </Content>
      </Container>
    </>
  );
}
