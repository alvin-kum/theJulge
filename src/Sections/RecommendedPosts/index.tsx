import Post from "@/components/Postcard";
import PostGrid from "@/components/PostGrid";
import { RecommendedSection, Container, SectionTitle } from "./styles";

import { mockPosts } from "@/data/mockPosts";

export default function RecommendedPosts() {
  return (
    <RecommendedSection>
      <Container>
        <SectionTitle>맞춤공고</SectionTitle>
        <PostGrid variant="recommended">
          {mockPosts.slice(0, 3).map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </PostGrid>
      </Container>
    </RecommendedSection>
  );
}
