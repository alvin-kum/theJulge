import React from "react";
import { PaginationWrapper, PageButton, NavButton } from "./styles";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationWrapper>
      <NavButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <img src="/images/Pagination/prev.svg" alt="Previous" />
      </NavButton>

      {pageNumbers.map((num) => (
        <PageButton
          key={num}
          $active={num === currentPage}   // ✅ $active 로 변경
          onClick={() => onPageChange(num)}
        >
          {num}
        </PageButton>
      ))}

      <NavButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <img src="/images/Pagination/next.svg" alt="Next" />
      </NavButton>
    </PaginationWrapper>
  );
};

export default Pagination;
