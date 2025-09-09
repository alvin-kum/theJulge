import { useState, useMemo } from "react";
import Post from "@/components/Postcard";
import Dropdown from "@/components/Dropdown";
import Pagination from "@/components/Pagination";
import PostGrid from "@/components/PostGrid";
import { FilterWrapper } from "@/components/Filter";
import {
  AllPostsSection,
  Container,
  SectionTitle,
  ControlsWrapper,
  ButtonGroup,
  EmptyMessage,
} from "./styles";
import type { PostData } from "@/types/shop"; // 통합된 타입 임포트
import { useRouter } from "next/router";

interface AllPostsProps {
  posts: PostData[]; // 모든 posts 데이터를 받음
}

interface FilterState {
  locations: string[];
  startDate: string;
  minWage: number | "";
}

const POSTS_PER_PAGE = 6;

export default function AllPosts({ posts }: AllPostsProps) {
  const [sortOrder, setSortOrder] = useState("deadline");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    locations: [],
    startDate: "",
    minWage: "",
  });

  const isFilterApplied = useMemo(
    () =>
      filters.locations.length > 0 ||
      filters.startDate !== "" ||
      filters.minWage !== "",
    [filters]
  );

  const filteredPosts = useMemo(() => {
    if (!isFilterApplied) return posts;
    return posts.filter((post) => {
      const matchesLocation =
        filters.locations.length === 0 || filters.locations.includes(post.address1);

      const matchesStartDate =
        !filters.startDate || new Date(post.startsAt) >= new Date(filters.startDate);

      const matchesMinWage =
        !filters.minWage || post.hourlyPay >= filters.minWage;

      return matchesLocation && matchesStartDate && matchesMinWage;
    });
  }, [posts, filters, isFilterApplied]);

  const sortedPosts = useMemo(() => {
    const postsCopy = [...filteredPosts];
    switch (sortOrder) {
      case "deadline":
        return postsCopy.sort(
          (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
        );
      case "wage":
        return postsCopy.sort((a, b) => b.hourlyPay - a.hourlyPay);
      case "time":
        return postsCopy.sort((a, b) => a.workhour - b.workhour);
      case "alphabet":
        return postsCopy.sort((a, b) => a.name.localeCompare(b.name, "ko"));
      default:
        return postsCopy;
    }
  }, [sortOrder, filteredPosts]);

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = sortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useMemo(() => {
    setCurrentPage(1);
  }, [filters, sortOrder]);

  const router = useRouter();

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
            <FilterWrapper filters={filters} setFilters={setFilters} />
          </ButtonGroup>
        </ControlsWrapper>

        {currentPosts.length > 0 ? (
          <PostGrid variant="all">
            {currentPosts.map((post) => (
              <Post
                key={post.id}
                {...post}
                onClick={() => router.push(`/shop/${post.id}`)} // shop 상세페이지로 이동
              />
            ))}
          </PostGrid>
        ) : (
          // 필터가 적용되었을 때만 "검색결과가 없습니다" 메시지 표시
          isFilterApplied && <EmptyMessage>조건에 맞는 검색결과가 없습니다😢</EmptyMessage>
        )}

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
      </Container>
    </AllPostsSection>
  );
}