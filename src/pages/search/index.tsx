import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Post from "@/components/Postcard";
import PostGrid from "@/components/PostGrid";
import Pagination from "@/components/Pagination";
import Dropdown from "@/components/Dropdown";
import { FilterWrapper } from "@/components/Filter";
import { listNotices } from "@/lib/api/notice";
import type { PostData } from "@/types/shop";
import {
  AllPostsSection,
  Container,
  ControlsWrapper,
  SectionTitle,
  Highlight,
  ButtonGroup,
  EmptyMessage,
} from "@/components/Sections/AllPosts/styles";

const POSTS_PER_PAGE = 6;

// 🔹 필터 상태 타입 정의
interface FilterState {
  locations: string[];
  startDate: string;
  minWage: number | "";
}

// 🔹 정렬 옵션 타입 정의
type SortOrder = "deadline" | "wage" | "time" | "alphabet";

export default function SearchPage() {
  const router = useRouter();
  const { keyword } = router.query;

  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 정렬 & 필터 상태
  const [sortOrder, setSortOrder] = useState<SortOrder>("deadline");
  const [filters, setFilters] = useState<FilterState>({
    locations: [],
    startDate: "",
    minWage: "",
  });

  // 🔹 검색 결과 API 호출
  useEffect(() => {
    if (!keyword) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await listNotices({ keyword: keyword as string });

        const mapped = data.items.map(({ item }): PostData => ({
          id: Number(item.id),
          hourlyPay: item.hourlyPay,
          startsAt: item.startsAt,
          workhour: item.workhour,
          description: item.description,
          closed: item.closed,
          name: item.shop.item.name,
          imageUrl: item.shop.item.imageUrl,
          address1: item.shop.item.address1,
          originalHourlyPay: item.hourlyPay,
          createdAt: item.startsAt,
          updatedAt: item.startsAt,
        }));

        setPosts(mapped);
      } catch (err) {
        console.error("검색 결과 불러오기 실패:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  // 🔹 필터 적용
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesLocation =
        filters.locations.length === 0 || filters.locations.includes(post.address1);

      const matchesStartDate =
        !filters.startDate || new Date(post.startsAt) >= new Date(filters.startDate);

      const matchesMinWage =
        !filters.minWage || post.hourlyPay >= filters.minWage;

      return matchesLocation && matchesStartDate && matchesMinWage;
    });
  }, [posts, filters]);

  // 🔹 정렬 적용
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
  }, [filteredPosts, sortOrder]);

  // 🔹 페이지네이션 적용
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;

  const currentPosts = useMemo(
    () => sortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE),
    [sortedPosts, startIndex]
  );

  // 🔹 페이지 변경 시
  const handlePageChange = (page: number) => setCurrentPage(page);

  // 🔹 필터/정렬 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOrder]);

  return (
    <AllPostsSection>
      <Container>
        {/* 🔹 섹션 제목 + 정렬/필터 */}
        <ControlsWrapper>
          <SectionTitle>
            {keyword ? (
              <>
                <Highlight>{keyword}</Highlight>에 대한 공고 목록
              </>
            ) : (
              "검색 결과"
            )}
          </SectionTitle>
          <ButtonGroup>
            <Dropdown
              value={sortOrder}
              onChange={(value: string) => setSortOrder(value as SortOrder)}
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

        {/* 🔹 검색 결과 표시 */}
        {loading ? (
          <EmptyMessage>검색 중입니다...⌛</EmptyMessage>
        ) : currentPosts.length > 0 ? (
          <>
            <PostGrid variant="all">
              {currentPosts.map((post) => (
                <Post
                  key={post.id}
                  {...post}
                  onClick={() => router.push(`/shop/${post.id}`)}
                />
              ))}
            </PostGrid>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <EmptyMessage>
            {keyword
              ? `"${keyword}"에 대한 검색결과가 없습니다 😢`
              : "검색 결과가 없습니다 😢"}
          </EmptyMessage>
        )}
      </Container>
    </AllPostsSection>
  );
}
