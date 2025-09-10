import { useRouter } from "next/router";
import Post from "@/components/Postcard";
import PostGrid from "@/components/PostGrid";
import { RecommendedSection, Container, SectionTitle } from "./styles";
import type { PostData } from "@/types/shop";

interface RecommendedPostsProps {
  posts: PostData[];
}

export default function RecommendedPosts({ posts }: RecommendedPostsProps) {
  const router = useRouter();

  return (
    <RecommendedSection>
      <Container>
        <SectionTitle>맞춤공고</SectionTitle>
        <PostGrid variant="recommended">
          {posts.slice(0, 3).map((post) => (
            <Post
              key={post.id}
              {...post}
              onClick={() => router.push(`/shop/${post.id}`)} // 클릭 시 상세페이지 이동
            />
          ))}
        </PostGrid>
      </Container>
    </RecommendedSection>
  );
}
