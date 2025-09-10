// pages/index.tsx
import { useState, useEffect } from "react";
import CustomHeader from "@/components/Header/Header";
import Footer from "@/components/Footer";
import RecommendedPosts from "@/components/Sections/RecommendedPosts";
import AllPosts from "@/components/Sections/AllPosts";
import { listNotices } from "@/lib/api/notice";
import { transformNoticeToPostData, NoticeItem } from "@/utils/transformers";
import type { PostData } from "@/types/shop";

import {
  LoadingMessage,
  ErrorContainer,
  ErrorText,
  RetryButton,
} from "@/styles/StatusMessageStyles";

type ListNoticesResponse = {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: { item: NoticeItem }[];
};

export default function HomePage() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const limit = 20;

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res: ListNoticesResponse = await listNotices({ offset, limit });
      const newPosts: PostData[] = res.items.map(({ item }) =>
        transformNoticeToPostData(item)
      );
      setPosts((prev) => [...prev, ...newPosts]);
      setHasNext(res.hasNext);
    } catch (err: any) {
      console.error(err);
      setError("공고를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [offset]);

  return (
    <>
      <main>
        <RecommendedPosts posts={posts.slice(0, 3)} />
        <AllPosts posts={posts} />

        {/* 로딩 / 에러 메시지 */}
        {loading && <LoadingMessage>Loading...</LoadingMessage>}
        {error && (
          <ErrorContainer>
            <ErrorText>{error}</ErrorText>
            <RetryButton
              onClick={() => {
                setError(null);
                setOffset(0);
                setPosts([]);
                fetchPosts();
              }}
            >
              다시 시도
            </RetryButton>
          </ErrorContainer>
        )}
      </main>
    </>
  );
}
