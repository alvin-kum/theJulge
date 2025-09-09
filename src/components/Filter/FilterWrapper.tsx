import { useState } from "react";
import FilterButtonComponent from "@/components/Filter/FilterButton";
import DetailedFilter from "@/components/Filter/DetailedFilter";
import { Wrapper } from "@/components/Filter/styles";
import type { FilterState } from "@/components/Filter/types";

interface FilterWrapperProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export default function FilterWrapper({
  filters,
  setFilters,
}: FilterWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = (newFilters: FilterState) => {
    setFilters(newFilters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const resetFilters: FilterState = { 
      locations: [], 
      startDate: "", 
      minWage: "" 
    };
    setFilters(resetFilters);
    setIsOpen(false);
  };

  const handleClose = () => setIsOpen(false);
  const handleToggle = () => setIsOpen(prev => !prev);

  // 적용된 필터 개수 계산
  const getAppliedFilterCount = (): number => {
    let count = 0;
    if (filters.locations.length > 0) count++;
    if (filters.startDate !== "") count++;
    if (filters.minWage !== "") count++;
    return count;
  };

  return (
    <Wrapper>
      <FilterButtonComponent
        appliedCount={getAppliedFilterCount()}
        onClick={handleToggle}
        isModalOpen={isOpen}
      />

      <DetailedFilter
        isOpen={isOpen}
        currentFilters={filters}
        onApply={handleApply}
        onReset={handleReset}
        onClose={handleClose}
      />
    </Wrapper>
  );
}