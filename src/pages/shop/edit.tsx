import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import NavBar from "@/components/NavBar";
import { apiClient } from '@/lib/api/client';

const Container = styled.div`
  min-height: 100vh;
  background: #fafafa;
  padding-top: 80px;
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
  
  &:hover {
    color: #374151;
  }
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
  
  &::placeholder {
    color: #9ca3af;
  }
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
  
  &::placeholder {
    color: #9ca3af;
  }
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
  
  &:hover {
    background: #dc2626;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const categories = [
  '한식', '중식', '일식', '양식', '분식', 
  '카페', '편의점', '기타'
];

export default function ShopEdit() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [shopId, setShopId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '한식',
    address1: '서울시 종로구',
    address2: '',
    description: '',
    imageUrl: '',
    originalHourlyPay: 10000,
  });

  useEffect(() => {
    const getShopId = async () => {
      try {
        const urlShopId = router.query.id as string;
        
        if (urlShopId) {
          setShopId(urlShopId);
        } else {
          const myShopResponse = await apiClient.get('/shops/my');
          if (myShopResponse.item && myShopResponse.item.id) {
            setShopId(myShopResponse.item.id);
          } else {
            router.replace('/shop');
            return;
          }
        }
      } catch (error) {
        console.error('가게 ID 확인 실패:', error);
        router.replace('/shop');
      }
    };

    if (router.isReady) {
      getShopId();
    }
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    if (!shopId) return;

    const fetchShopData = async () => {
      try {
        const response = await apiClient.get(`/shops/${shopId}`);
        if (response.item) {
          const data = {
            name: response.item.name || '',
            category: response.item.category || '한식',
            address1: response.item.address1 || '',
            address2: response.item.address2 || '',
            description: response.item.description || '',
            imageUrl: response.item.imageUrl || '',
            originalHourlyPay: response.item.originalHourlyPay || 10000,
          };
          setFormData(data);
          if (data.imageUrl) {
            setImagePreview(data.imageUrl);
          }
        }
      } catch (error) {
        console.error('Failed to fetch shop data:', error);
        alert('가게 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchShopData();
  }, [shopId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'originalHourlyPay' ? Number(value) : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!shopId) {
      alert('가게 정보를 확인할 수 없습니다.');
      return;
    }
    
    if (!formData.name.trim()) {
      alert('가게 이름을 입력해주세요.');
      return;
    }
    
    if (!formData.address1.trim()) {
      alert('주소를 입력해주세요.');
      return;
    }
    
    if (formData.originalHourlyPay < 9620) {
      alert('기본 시급은 최저시급(9,620원) 이상이어야 합니다.');
      return;
    }

    setLoading(true);
    try {
      await apiClient.put(`/shops/${shopId}`, formData);
      alert('가게 정보가 수정되었습니다.');
      router.push(`/shop/manage?id=${shopId}`);
    } catch (error) {
      console.error('Failed to update shop:', error);
      alert('수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (confirm('변경사항이 저장되지 않을 수 있습니다. 정말 나가시겠습니까?')) {
      if (shopId) {
        router.push(`/shop/manage?id=${shopId}`);
      } else {
        router.push('/shop');
      }
    }
  };

  return (
    <>
      <Head>
        <title>가게 정보 - THE JULGE</title>
        <meta name="description" content="가게 정보를 수정하세요" />
      </Head>
      <NavBar />
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
                  <Label>
                    가게 이름<Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="입력"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>
                    분류<Required>*</Required>
                  </Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>
                    주소<Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleInputChange}
                    placeholder="서울시 종로구 혹은 00시 00구"
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>
                    상세 주소<Required>*</Required>
                  </Label>
                  <Input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    placeholder="10층"
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>
                  기본 시급<Required>*</Required>
                </Label>
                <Input
                  type="number"
                  name="originalHourlyPay"
                  value={formData.originalHourlyPay}
                  onChange={handleInputChange}
                  placeholder="10000"
                  min="9620"
                  step="10"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>가게 이미지</Label>
                <ImageUploadSection>
                  <ImageUploadArea onClick={() => document.getElementById('imageInput')?.click()}>
                    {imagePreview ? (
                      <ImagePreview src={imagePreview} alt="가게 이미지 미리보기" />
                    ) : (
                      <>
                        <UploadIcon>📷</UploadIcon>
                        <UploadText>이미지 첨부하기</UploadText>
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
                  onChange={handleInputChange}
                  placeholder="입력해주세요"
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={loading}>
                {loading ? '저장 중...' : '완료하기'}
              </SubmitButton>
            </Form>
          </FormCard>
        </Content>
      </Container>
    </>
  );
}