import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #eee;
`;

const Logo = styled(Image)`
  cursor: pointer;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  max-width: 400px;
  margin: 0 24px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const SearchBtn = styled(Image)`
  cursor: pointer;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
`;

const NavRightBtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RightBtn = styled.h3`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: #0070f3;
  }
`;

const AlertIcon = styled(Image)`
  cursor: pointer;
`;

const CustomHeader = () => {
  const router = useRouter();

  return (
    <Header>
      <Logo
        src={"/logo.svg"}
        width={112}
        height={40}
        alt="더줄게 로고"
        onClick={() => router.push("/")}
        priority
      />
      <SearchContainer>
        <SearchBtn
          src={"/search.svg"}
          width={20}
          height={20}
          alt="찾기 버튼"
          onClick={() => {}}
        />
        <SearchInput
          type="text"
          value=""
          onChange={() => {}}
          onKeyDown={() => {}}
          placeholder="가게 이름으로 찾아보세요"
        />
      </SearchContainer>
      <NavRightBtnContainer>
        <RightBtn onClick={() => router.push("/shop")}>내 가게</RightBtn>
        <RightBtn>로그아웃</RightBtn>
        {true && (
          <AlertIcon
            src={false ? "/alert-active.svg" : "/alert-inactive.svg"}
            width={24}
            height={24}
            alt="알림 버튼"
            onClick={() => {}}
          />
        )}
      </NavRightBtnContainer>
    </Header>
  );
};

export default CustomHeader;

