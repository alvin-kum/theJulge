import { useState, useEffect, useRef } from "react";
import {
  DropdownBox,
  FilterTitleWrapper,
  FilterTitle,
  CloseButton,
  Section,
  SectionTitle,
  LocationGrid,
  LocationTag,
  InputWithUnitContainer,
  InputField,
  InputWrapper,
  UnitText,
  HelperText,
  ButtonGroup,
  ResetButton,
  ApplyButton
} from "@/components/Filter/styles";
import type { FilterState } from "@/components/Filter/types";

interface DetailedFilterProps {
  isOpen: boolean;
  currentFilters: FilterState;
  onApply: (filters: FilterState) => void;
  onReset: () => void;
  onClose: () => void;
}

const LOCATIONS = [
  "서울시 강남구", "서울시 강동구", "서울시 강북구", "서울시 강서구", "서울시 관악구", "서울시 광진구", 
  "서울시 구로구", "서울시 금천구", "서울시 노원구", "서울시 도봉구", "서울시 동대문구", "서울시 동작구", 
  "서울시 마포구", "서울시 서대문구", "서울시 서초구", "서울시 성동구", "서울시 성북구", "서울시 송파구", 
  "서울시 양천구", "서울시 영등포구", "서울시 용산구", "서울시 종로구", "서울시 중구", "서울시 중랑구"

] as const;

export default function DetailedFilter({
  isOpen,
  currentFilters,
  onApply,
  onReset,
  onClose,
}: DetailedFilterProps) {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [startDate, setStartDate] = useState("");
  const [minWage, setMinWage] = useState<string>("");
  const boxRef = useRef<HTMLDivElement>(null);

  // currentFilters가 변경될 때 로컬 상태 업데이트
  useEffect(() => {
    setSelectedLocations(currentFilters.locations);
    setStartDate(currentFilters.startDate);
    // minWage가 숫자인 경우 쉼표 포맷팅 적용
    if (currentFilters.minWage !== "" && currentFilters.minWage !== undefined) {
      setMinWage(Number(currentFilters.minWage).toLocaleString('ko-KR'));
    } else {
      setMinWage("");
    }
  }, [currentFilters]);

  useEffect(() => {
  const handleBodyClass = () => {
    if (window.innerWidth <= 768 && isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  };

  // 초기 실행
  handleBodyClass();

  // 리사이즈 시에도 적용
  window.addEventListener("resize", handleBodyClass);

  // cleanup: 컴포넌트 언마운트 시
  return () => {
    document.body.classList.remove("modal-open");
    window.removeEventListener("resize", handleBodyClass);
  };
}, [isOpen]);


  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev => 
      prev.includes(loc) 
        ? prev.filter(l => l !== loc)
        : [...prev, loc]
    );
  };

  const removeLocation = (loc: string) => {
    setSelectedLocations(prev => prev.filter(l => l !== loc));
  };

  const handleMinWageChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남김
    
    // 최대 10자리 수 제한 (10,000,000,000원까지)
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    
    if (value === "") { 
      setMinWage(""); 
    } else { 
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue >= 0) { 
        // 3자리마다 쉼표 추가
        const formattedValue = numValue.toLocaleString('ko-KR');
        setMinWage(formattedValue);
      } 
    } 
  };

  // 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  // ESC 키로 닫기
  useEffect(() => {
    function handleEscKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      return () => document.removeEventListener("keydown", handleEscKey);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <DropdownBox ref={boxRef}>
      <FilterTitleWrapper>
        <FilterTitle>상세 필터</FilterTitle>
        <CloseButton onClick={onClose} aria-label="필터 닫기">
            <img src="/images/Filter/close.svg" alt="닫기" />
        </CloseButton>
      </FilterTitleWrapper>

      <Section>
        <SectionTitle>위치</SectionTitle>
        <LocationGrid>
            {LOCATIONS.map((loc) => {
            const isSelected = selectedLocations.includes(loc);
            return (
                <button
                key={loc}
                type="button"
                onClick={() => {
                    if (!isSelected) toggleLocation(loc); // 선택만 가능
                }}
                aria-pressed={isSelected}
                >
                {loc}
                </button>
            );
            })}
        </LocationGrid>

        {selectedLocations.length > 0 && (
            <div>
            {selectedLocations.map((loc) => (
                <LocationTag
                key={loc}
                onClick={() => removeLocation(loc)} // 하단 태그에서만 제거 가능
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    removeLocation(loc);
                    }
                }}
                aria-label={`${loc} 제거`}
                >
                {loc} ×
                </LocationTag>
            ))}
            </div>
        )}
        </Section>

      <Section>
        <SectionTitle>시작일</SectionTitle>
        <InputField
            type="text"
            value={startDate}
            onChange={(e) => {
                let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 남김

                // 자동 하이픈 포맷팅
                if (value.length > 4 && value.length <= 6) {
                value = value.slice(0, 4) + "-" + value.slice(4);
                } else if (value.length > 6) {
                value = value.slice(0, 4) + "-" + value.slice(4, 6) + "-" + value.slice(6, 8);
                }

                if (value.length > 10) value = value.slice(0, 10); // 최대 길이 제한 YYYY-MM-DD

                setStartDate(value);
            }}
            placeholder="예시) 1990-05-21"
            aria-label="시작일 입력"
            />
      </Section>

      <Section>
        <SectionTitle>최소 급여</SectionTitle>
        <InputWrapper>
            <InputWithUnitContainer>
              <InputField
                type="text"
                value={minWage}
                onChange={handleMinWageChange}
                placeholder="입력"
                aria-label="최소 급여 입력"
              />
              <UnitText>원</UnitText>
            </InputWithUnitContainer>
            <HelperText>이상부터</HelperText>
        </InputWrapper>
      </Section>

      <ButtonGroup>
        <ResetButton type="button" onClick={onReset}>
          초기화
        </ResetButton>
        <ApplyButton 
            type="button"
            onClick={() => {
              // 쉼표 제거 후 숫자로 변환
              const numericMinWage = minWage ? Number(minWage.replace(/,/g, "")) : "";
              onApply({ locations: selectedLocations, startDate, minWage: numericMinWage });
            }}
        >
          적용하기
        </ApplyButton>
      </ButtonGroup>
    </DropdownBox>
  );
}