import dynamic from 'next/dynamic';
import React from 'react';

export interface PostProps {
  id: number;
  imageUrl: string;
  name: string;
  startTime: string;
  endTime: string;
  location: string;
  wage: number;
  originalHourlyPay: number;
  duration?: number;
}

// ✅ 클라이언트에서만 렌더링되는 PostCard
const PostCardClient = dynamic(
  () => import('./PostCardClient'),
  {
    ssr: false,
    loading: () => (
      <div 
        style={{ 
          width: '100%', 
          height: '200px', 
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6c757d'
        }}
      >
        <div>
          <div>📋 카드 로딩 중...</div>
        </div>
      </div>
    )
  }
);

const Post: React.FC<PostProps> = (props) => {
  return <PostCardClient {...props} />;
};

export default Post;
