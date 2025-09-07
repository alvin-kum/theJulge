import { FilterButton } from "@/components/Filter/styles";

interface FilterButtonComponentProps {
  appliedCount?: number;
  onClick: () => void;
}

export default function FilterButtonComponent({
  appliedCount = 0,
  onClick,
}: FilterButtonComponentProps) {
  const isApplied = appliedCount > 0;

  return (
    <FilterButton 
      $applied={isApplied} 
      onClick={onClick}
      type="button"
      aria-label={`상세필터${isApplied ? ` ${appliedCount}개 적용됨` : ''}`}
    >
      상세필터
      {isApplied && ` (${appliedCount})`}
    </FilterButton>
  );
}