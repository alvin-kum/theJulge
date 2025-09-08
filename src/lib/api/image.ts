import { apiClient } from './client';

export const uploadImage = async (file: File): Promise<string> => {
  // 1. Presigned URL 요청
  const { item } = await apiClient.post<{ item: { url: string } }>('/images');
  
  // 2. 이미지 업로드
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch(item.url, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('이미지 업로드에 실패했습니다.');
  }
  
  // 3. 업로드된 이미지 URL 반환
  return item.url.split('?')[0]; // presigned URL에서 실제 이미지 URL 추출
};
