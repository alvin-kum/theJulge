import { useState } from "react";
import RecommendedPosts from "@/Sections/RecommendedPosts";
import AllPosts from "@/Sections/AllPosts";
import { mockPosts } from "@/data/mockPosts";
import Footer from "@/layouts/Footer";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = mockPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(mockPosts.length / postsPerPage);

  return (
    <>
      <header>
        <h1>헤더 영역</h1>
      </header>

      <main>
        <RecommendedPosts />
        <AllPosts
          currentPosts={currentPosts}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>

      <Footer />
    </>
  );
}
