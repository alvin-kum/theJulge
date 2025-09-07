import { useState, useMemo } from "react";
import Post from "@/components/Postcard";
import Dropdown from "@/components/Dropdown";
import Pagination from "@/components/Pagination";
import PostGrid from "@/components/PostGrid";
import { FilterWrapper } from "@/components/Filter"; // FilterWrapper로 통합
import {
  AllPostsSection,
  Container,
  SectionTitle,
  ControlsWrapper,
  ButtonGroup,
  EmptyMessage,
} from "./styles";
import type { PostProps } from "@/components/Postcard"; 

interface AllPostsProps {
  currentPosts: PostProps[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface FilterState {
  locations: string[];
  startDate: string;
  minWage: number | "";
}

export default function AllPosts({
  currentPosts,
  totalPages,
  currentPage,
  onPageChange,
}: AllPostsProps) {
  const [sortOrder, setSortOrder] = useState("deadline");
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

  const appliedFilterCount = useMemo(() => {
    let count = 0;
    if (filters.locations.length > 0) count += 1;
    if (filters.startDate !== "") count += 1;
    if (filters.minWage !== "") count += 1;
    return count;
  }, [filters]);

  // 근무시간 가져오기
  const getDuration = (post: PostProps) => {
    return post.workhour; // 숫자 타입이므로 그대로 리턴
  };

  const filteredPosts = useMemo(() => {
    if (!isFilterApplied) return currentPosts;
    return currentPosts.filter((post) => {
      const matchesLocation =
        filters.locations.length === 0 || filters.locations.includes(post.address1);

      const matchesStartDate =
        !filters.startDate || new Date(post.startsAt) >= new Date(filters.startDate);

      const matchesMinWage =
        !filters.minWage || post.hourlyPay >= filters.minWage;

      return matchesLocation && matchesStartDate && matchesMinWage;
    });
  }, [currentPosts, filters, isFilterApplied]);

  const sortedPosts = useMemo(() => {
    const postsCopy = [...filteredPosts];
    switch (sortOrder) {
      case "deadline":
        return postsCopy.sort(
          (a, b) =>
            new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
        );
      case "wage":
        return postsCopy.sort((a, b) => b.hourlyPay - a.hourlyPay);
      case "time":
        return postsCopy.sort((a, b) => getDuration(a) - getDuration(b));
      case "alphabet":
        return postsCopy.sort((a, b) => a.name.localeCompare(b.name, "ko"));
      default:
        return postsCopy;
    }
  }, [sortOrder, filteredPosts]);

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

            {/* FilterWrapper로 통합 */}
            <FilterWrapper filters={filters} setFilters={setFilters} />
          </ButtonGroup>
        </ControlsWrapper>

        {sortedPosts.length > 0 ? (
          <PostGrid variant="all">
            {sortedPosts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </PostGrid>
        ) : (
          <EmptyMessage>조건에 맞는 검색결과가 없습니다😢</EmptyMessage>
        )}

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
      </Container>
    </AllPostsSection>
  );
}
