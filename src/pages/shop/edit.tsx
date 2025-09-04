import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import NavBar from "@/components/NavBar";
import { apiClient } from '@/lib/api/client';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 1px solid #e0e0e0;
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ea3c3c;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ea3c3c;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 32px;
`;

const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  
  ${props => props.variant === 'primary' ? `
    background: #ea3c3c;
    color: white;
    border: none;
    
    &:hover {
      background: #dc2626;
      transform: translateY(-1px);
    }
  ` : `
    background: white;
    color: #374151;
    border: 2px solid #d1d5db;
    
    &:hover {
      border-color: #ea3c3c;
      color: #ea3c3c;
    }
  `}
`;

export default function ShopEdit() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    address1: '',
    address2: '',
    description: '',
    imageUrl: '',
    originalHourlyPay: 0,
  });

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await apiClient.get('/shops/my');
        if (response.item) {
          setFormData({
            name: response.item.name || '',
            category: response.item.category || '',
            address1: response.item.address1 || '',
            address2: response.item.address2 || '',
            description: response.item.description || '',
            imageUrl: response.item.imageUrl || '',
            originalHourlyPay: response.item.originalHourlyPay || 0,
          });
        }
      } catch (error) {
        console.error('Failed to fetch shop data:', error);
      }
    };

    fetchShopData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.put('/shops/my', formData);
      alert('가게 정보가 수정되었습니다.');
      router.push('/shop');
    } catch (error) {
      console.error('Failed to update shop:', error);
      alert('수정에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    router.push('/shop');
  };

  return (
    <>
      <Head>
        <title>가게 정보 수정 - THE JULGE</title>
        <meta name="description" content="가게 정보를 수정하세요" />
      </Head>
      <NavBar />
      <Container>
        <Header>
          <Title>가게 정보 수정</Title>
          <Subtitle>가게의 정보를 정확히 입력해주세요</Subtitle>
        </Header>

        <Card>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">가게 이름 *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="가게 이름을 입력하세요"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="category">카테고리 *</Label>
              <Input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="카테고리를 입력하세요"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address1">가게 주소 1 *</Label>
              <Input
                type="text"
                id="address1"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                placeholder="가게 주소를 입력하세요"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address2">가게 주소 2</Label>
              <Input
                type="text"
                id="address2"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
                placeholder="가게 주소를 입력하세요"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">가게 소개</Label>
              <TextArea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="가게를 소개해주세요"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="originalHourlyPay">기본 시급 (원) *</Label>
              <Input
                type="number"
                id="originalHourlyPay"
                name="originalHourlyPay"
                value={formData.originalHourlyPay}
                onChange={handleInputChange}
                placeholder="기본 시급을 입력하세요"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="imageUrl">가게 대표 이미지 URL</Label>
              <Input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="이미지 URL을 입력하세요"
              />
            </FormGroup>

            <ButtonGroup>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                취소
              </Button>
              <Button type="submit" variant="primary">
                저장하기
              </Button>
            </ButtonGroup>
          </Form>
        </Card>
      </Container>
    </>
  );
}