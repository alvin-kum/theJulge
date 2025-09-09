import { FilterButton } from "@/components/Filter/styles";

interface FilterButtonComponentProps {
  appliedCount?: number;
  onClick: () => void;
  isModalOpen?: boolean; // 모달 열림 상태
}

export default function FilterButtonComponent({
  appliedCount = 0,
  onClick,
  isModalOpen = false,
}: FilterButtonComponentProps) {
  const isApplied = appliedCount > 0 || isModalOpen; // 모달 열림 시에도 활성화 상태

  return (
    <FilterButton 
      $applied={isApplied} 
      onClick={isModalOpen ? undefined : onClick} // 모달 열리면 클릭 불가
      type="button"
      aria-label={`상세필터${isApplied ? ` ${appliedCount}개 적용됨` : ''}`}
      disabled={isModalOpen} // 클릭 불가 스타일 적용
    >
      상세필터
      {appliedCount > 0 && ` (${appliedCount})`}
    </FilterButton>
  );
}
