import { useState, useMemo } from "react";
import Post from "@/components/Postcard";
import Dropdown from "@/components/Dropdown";
import Pagination from "@/components/Pagination";
import PostGrid from "@/components/PostGrid"; 
import {
  AllPostsSection,
  Container,
  SectionTitle,
  ControlsWrapper,
  ButtonGroup,
  FilterButton,
  FilterModalBackdrop,
  FilterModalBox,
} from "./styles";

interface PostType {
  id: number;
  imageUrl: string;
  name: string;
  startTime: string;  
  endTime: string;    
  location: string;
  wage: number;
  originalHourlyPay: number;
}

interface AllPostsProps {
  currentPosts: PostType[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function AllPosts({
  currentPosts,
  totalPages,
  currentPage,
  onPageChange,
}: AllPostsProps) {
  const [sortOrder, setSortOrder] = useState("deadline");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /** 근무시간 계산 */
  const getDuration = (post: PostType) => {
    const start = new Date(post.startTime);
    const end = new Date(post.endTime);
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  };

  /** 정렬 */
  const sortedPosts = useMemo(() => {
    const postsCopy = [...currentPosts];
    switch (sortOrder) {
      case "deadline":
        return postsCopy.sort(
          (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
      case "wage":
        return postsCopy.sort((a, b) => b.wage - a.wage);
      case "time":
        return postsCopy.sort((a, b) => getDuration(a) - getDuration(b));
      case "alphabet":
        return postsCopy.sort((a, b) => a.name.localeCompare(b.name, "ko"));
      default:
        return postsCopy;
    }
  }, [sortOrder, currentPosts]);

  return (
    <AllPostsSection>
      <Container>
        <ControlsWrapper>
          <SectionTitle>전체공고</SectionTitle>

          <ButtonGroup>
            <Dropdown
              value={sortOrder}
              onChange={setSortOrder}
              options={[
                { value: "deadline", label: "마감임박순" },
                { value: "wage", label: "시급많은순" },
                { value: "time", label: "시간적은순" },
                { value: "alphabet", label: "가나다순" },
              ]}
            />
            <FilterButton onClick={() => setIsFilterOpen(true)}>상세필터</FilterButton>
          </ButtonGroup>
        </ControlsWrapper>

        {/* Post 출력 */}
        <PostGrid variant="all">
          {sortedPosts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </PostGrid>

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}

        {/* 상세필터 모달 */}
        <FilterModalBackdrop
          $open={isFilterOpen}
          onClick={() => setIsFilterOpen(false)}
        >
          <FilterModalBox onClick={(e) => e.stopPropagation()}>
            <h3>상세 필터</h3>
            <p>시급 범위, 근무 시간 등 필터 UI</p>
            <FilterButton onClick={() => setIsFilterOpen(false)}>닫기</FilterButton>
          </FilterModalBox>
        </FilterModalBackdrop>
      </Container>
    </AllPostsSection>
  );
}
