import Image from "next/image";
import style from "./CustomHeader.module.css";
import NotificationModal from "../NotificationModal/NotificationModal";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * NotificationModal폴더의 경우 ui 작업은 다 끝이났고 api 호출해서 데이터만 넣어주면됩니다.
 * src/axios.ts와 src/lib/api/alert.ts 안에 전부 정리가 되어 있어서 따로 설정하지 않아도 
 * 그냥 있는거를 가져와서 쓰면 될 것 같습니다.
 * 여러분들이 작업해놓은 src/axios.ts, src/lib/api/alert.ts 경로안에 있는 api를
 * 여기 커스텀 헤더 부분 안쪽에 호출해줘서 값을 추출한 뒤
 * props로 <NotificationModal />여기에 전달해서 사용하면 될 것 같습니다!
 *
 * 과정은 아래에 주석으로 남겨놓도록 하겠습니다!
 *
 * 주석은
 * 1. CustomHeader.tsx
 * 2. NotificationModal.tsx
 * 3. NotificationList.tsx
 * 4. NotificationCard.tsx
 * 순서로 읽어 보시면 api를 가져와서 설정하기에 편하실거라고 생각합니다.
 */

const CustomHeader = ({
  isLoggedIn,
  href,
  pagename,
  handleLogoutClick,
}: {
  isLoggedIn: boolean; // 로그인 성공 여부 판단
  href: string; // 클릭시 이동하는 경로 ex) /mystore
  pagename: string; // 내 가게 or 내 프로필 같은 정보 입력
  handleLogoutClick: () => void; // 로그아웃 버튼 눌렀을때 isLoggedIn이 false로 바뀌어야함.
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const q = router.query.q as string; // 쿼리스트링 q값을 받아옴.

  //모달 외부 클릭시 모달창 종료
  useEffect(() => {
    const handleModalOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleModalOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleModalOutside);
    };
  }, [isOpen]);

  // 쿼리값 받아서 화면이 새로고침 되어도 검색창에는 내가 입력한 검색창이 남아있게 설계.
  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  // 검색창에 입력받는값 useState로 관리.
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 검색어 입력후 검색이미지 클릭시 도메인에 쿼리스트링 전달.
  // 이 쿼리스트링값을 공고 페이지에서 받아서 목록을 조회해줄수 있음.
  const handleSubmit = () => {
    if (!search || q === search) return;
    router.push(`/?q=${search}`); // 여기 슬레시와 물음표 사이에 경로를 공고페이지로 설정
  };

  // 검색어 입력후 엔터키 누르면 도메인에 쿼리스트링 전달.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // 로그인 성공한 이후 alert 이미지 클릭시 모달창 오픈
  const handleModalOpenClick = () => {
    setIsOpen(!isOpen);
  };

  // 로그인 되어있을때 로그아웃 버튼 누르면 로그아웃됨.
  // 내부의 handleLogoutClick() 함수와 isLoggedIn값은 외부에서 실제 로그인 관련 로직을 설정후 props로 뿌려주면됨.
  const handleClick = () => {
    handleLogoutClick();
    isLoggedIn ? router.replace("/") : router.push("/signup"); // 여기에 루트페이지와 회원가입 경로 설정
  };

  return (
    <header className={style.header}>
      <Image
        className={style.logo}
        src={"/logo.svg"}
        width={112}
        height={40}
        alt="더줄게 로고"
        onClick={() => router.push("/")} // 여기에 공고 리스트 페이지 경로 설정
        priority
      />
      {isLoggedIn && (
        <div className={style["search-container"]}>
          <Image
            className={style["search-btn"]}
            src={"/search.svg"}
            width={20}
            height={20}
            alt="찾기 버튼"
            onClick={handleSubmit}
          />
          <input
            className={style["search-input"]}
            type="text"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="가게 이름으로 찾아보세요"
          />
        </div>
      )}
      <div className={style["nav-right-btn-container"]}>
        <Link
          href={isLoggedIn ? `${href}` : "/login"} // 이부분에 로그인 페이지로 이동하는 경로 넣어주기
          className={style["right-first-btn"]}
        >
          {isLoggedIn ? `${pagename}` : "로그인"}
        </Link>
        <h3 className={style["right-second-btn"]} onClick={handleClick}>
          {isLoggedIn ? "로그아웃" : "회원가입"}
        </h3>
        {isLoggedIn && (
          <div className={style.modal_container}>
            <Image
              className={style["alert-icon"]}
              src={false ? "/alert-active.svg" : "/alert-inactive.svg"} // 이부분의 false 조건문도 alert api의 결과값이 존재하면 true, 없으면 false로 설정해주면 될 것 같습니다.
              width={24}
              height={24}
              alt="알림 버튼"
              onClick={handleModalOpenClick}
            />
            {isOpen && (
              // 이 밑에 있는 NotificationModal안에 props로 데이터를 Notification Card까지 전달해주면 될 것 같습니다.
              <div className={style.modal} ref={modalRef}>
                <NotificationModal
                  handleModalOpenClick={handleModalOpenClick}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default CustomHeader;
