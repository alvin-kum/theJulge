import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative; // 버튼 기준 드롭다운 위치
  display: inline-block;
`;

export const DropdownBox = styled.div`
  position: absolute;
  top: 100%;      /* 버튼 바로 아래 */
  right: 0;
  margin-top: 8px;
  z-index: 1000;

  width: 390px;
  max-width: 845px;
  overflow-y: auto;

  background: #ffffff;
  border: 1px solid #E5E4E7;
  border-radius: 10px;
  padding: 24px 20px;
  box-shadow: 0px 2px 8px 0px #78748640;

  /* 모바일 (768px 이하) 전체 화면 차지 */
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin-top: 0;

    width: 100%;
    height: 100%;
    padding: 24px 20px 100px;
    max-width: none;
    border-radius: 0;   /* 모바일에서는 모서리 둥글기 제거 */
    border: none;
    box-shadow: none;
  }
`;

export const FilterTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between; /* 좌우 끝으로 배치 */
  align-items: center;            /* 세로 가운데 정렬 */
  margin-bottom: 40px;
`;

export const FilterTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  line-height: 100%;
  color: #111322;
`;

export const CloseButton = styled.button`
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    display: block;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 쌓이도록 */
  gap: 12px;              /* 내부 요소 간 간격 */
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h4`
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #111322;
`;

export const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: start;
  gap: 20px;
  padding: 20px 28px;

  width: 100%;
  height: 258px;
  border-radius: 6px;
  border: 1px solid #E5E4E7;

  overflow-y: auto; 
  overflow-x: hidden; 

  font-size: 14px;
  font-weight: 400;
  line-height: 22px;

`;

export const LocationTag = styled.span`
  display: inline-block;
  height: 30px;
  margin: 4px;
  padding: 6px 10px;
  background: #FFEBE7;
  border-radius: 20px;
  
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;
  color: #EA3C12;

`;

// 인풋과 단위를 감싸는 래퍼
export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const InputWithUnitContainer = styled.span`
  position: relative;
  width: 170px;
  height: 58px;
  display: flex;
  align-items: center;
`;

export const InputField = styled.input`
  width: 100%;
  height: 58px;
  padding: 16px 20px;
  border: 1px solid #CBC9CF;
  border-radius: 6px;

  font-size: 16px;
  font-weight: 400;
  line-height: 26px;

  &::placeholder {
    color: #A4A1AA;        // 플레이스홀더 텍스트 색상
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;    
  }
`;

// 인풋 박스 오른쪽 끝에 표시되는 단위 텍스트
export const UnitText = styled.span`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;

  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  color: #111322;
  white-space: nowrap;
`;

// 인풋 외부 하단 안내 텍스트
export const HelperText = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  color: #111322;
  margin-left: 12px;
  white-space: nowrap;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  // 768px 이하 모바일 화면에서 하단 스티키 버튼 그룹
   @media (max-width: 768px) {  
    position: fixed;
    bottom: 0;        // 뷰포트 하단에 붙음
    left: 0;
    right: 0;
    z-index: 1100;    // 모달보다 위에 오도록 조정

    padding: 16px 20px;
    background-color: #ffffff;
    border-top: 1px solid #E5E4E7;
    gap: 12px;
  }
`;

export const ResetButton = styled.button`
  width: 82px;
  height: 48px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  cursor: pointer;

  background: #ffffff;
  color: #EA3C12;
  border: 1px solid #EA3C12;
`;

export const ApplyButton = styled.button`
  flex: 1; /* 남은 영역 꽉 채우게 */
  height: 48px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  background: #EA3C12;
  color: #ffffff;
  border: none;
`;

// 필터 버튼
export const FilterButton = styled.button<{ $applied?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  width: fit-content;
  height: 32px;
  padding: 0 14px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.2s ease;

  /* 기본 스타일 */
  background-color: ${(props) => (props.$applied ? "#FF8D72" : "#FF4040")};
  color: #fff;
  border: none;

  &:hover {
    background-color: ${(props) => (props.$applied ? "#FF8D72" : "#FF8D72")};
  }
`;
