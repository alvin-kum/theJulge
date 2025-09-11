import Image from "next/image";
import style from "./Header.module.css";
import NotificationModal from "../NotificationModal/NotificationModal";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { authAxios } from "@/lib/axios";

type Alerts = {
  count: number;
  items: {
    item: {
      id: string;
      createdAt: string;
      result: "accepted" | "rejected";
      read: boolean;
      application: {
        item: {
          id: string;
          status: "pending" | "accepted" | "rejected";
        };
        href: string;
      };
      shop: {
        item: {
          id: string;
          name: string;
          category: string;
          address1: string;
          address2: string;
          description: string;
          imageUrl: string;
          originalHourlyPay: number;
        };
        href: string;
      };
      notice: {
        item: {
          id: string;
          hourlyPay: number;
          description: string;
          startsAt: string;
          workhour: number;
          closed: boolean;
        };
        href: string;
      };
    };
  }[];
};

const mockAlerts: any = {
  count: 3,
  items: [
    {
      item: {
        id: "abc",
        createdAt: "2025-09-11T08:00+09:00",
        result: "accepted",
        read: false,
        application: {
          item: {
            id: "abcdefg",
            status: "accepted",
          },
          href: "",
        },
        shop: {
          item: {
            id: "hijklmn",
            name: "한국식당",
            category: "한식",
            address1: "서울시 종로구",
            address2: "디테일한 주소",
            description: "맛있는 밥집",
            imageUrl: "이미지 주소",
            originalHourlyPay: 10000,
          },
          href: "",
        },
        notice: {
          item: {
            id: "opqrstu",
            hourlyPay: 12000,
            description: "급하게 구합니다.",
            startsAt: "2025-09-13T13:00+09:00",
            workhour: 5,
            closed: false,
          },
          href: "",
        },
      },
    },
    {
      item: {
        id: "123",
        createdAt: "2025-09-11T09:00+09:00",
        result: "rejected",
        read: false,
        application: {
          item: {
            id: "456",
            status: "rejected",
          },
          href: "",
        },
        shop: {
          item: {
            id: "789",
            name: "일본식당",
            category: "일식",
            address1: "서울시 종로구",
            address2: "디테일한 주소",
            description: "맛있는 밥집",
            imageUrl: "이미지 주소",
            originalHourlyPay: 10000,
          },
          href: "",
        },
        notice: {
          item: {
            id: "0123",
            hourlyPay: 12000,
            description: "급하게 구합니다.",
            startsAt: "2025-09-15T11:00+09:00",
            workhour: 5,
            closed: false,
          },
          href: "",
        },
      },
    },
    {
      item: {
        id: "123gjh",
        createdAt: "2025-09-11T10:00+09:00",
        result: "rejected",
        read: false,
        application: {
          item: {
            id: "ds7f98",
            status: "rejected",
          },
          href: "",
        },
        shop: {
          item: {
            id: "asdf078",
            name: "중국식당",
            category: "중식",
            address1: "서울시 종로구",
            address2: "디테일한 주소",
            description: "맛있는 밥집",
            imageUrl: "이미지 주소",
            originalHourlyPay: 10000,
          },
          href: "",
        },
        notice: {
          item: {
            id: "1k234ghj",
            hourlyPay: 12000,
            description: "급하게 구합니다.",
            startsAt: "2025-09-17T09:00+09:00",
            workhour: 5,
            closed: false,
          },
          href: "",
        },
      },
    },
  ],
};

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
  const [alerts, setAlerts] = useState<any>(); // !!!! any 대신에 올바른 타입을 넣을 수 있으면 넣는게 좋습니다.
  const modalRef = useRef<HTMLDivElement>(null);

  const q = router.query.q as string; // 쿼리스트링 q값을 받아옴.

  const handleAlertsApi = async () => {
    const userId = localStorage.getItem("userId");
    const response = await authAxios.get(`/users/${userId}/alerts`);
    return await response.data;
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      handleAlertsApi().then((data) => setAlerts(data));
    }
  }, []);

  //모달 외부 클릭시 모달창 종료
  useEffect(() => {
    const handleModalOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(!isOpen);
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
    if (!search || search.trim() === "") return;
    router.push(`/search?keyword=${encodeURIComponent(search)}`); // 여기 슬레시와 물음표 사이에 경로를 공고페이지로 설정
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
              src={
                // alerts && alerts.count > 0
                mockAlerts.count ? "/alert-active.svg" : "/alert-inactive.svg"
              } // !!!!! 이부분이 알림 개수 보여주는 부분입니다.
              width={24}
              height={24}
              alt="알림 버튼"
              onClick={handleModalOpenClick}
            />
            {isOpen && (
              // 이 밑에 있는 NotificationModal안에 props로 데이터를 Notification Card까지 전달해주면 될 것 같습니다.
              <div className={style.modal} ref={modalRef}>
                <NotificationModal
                  alerts={
                    // !!!!!! 이부분이 받아온 데이터 넣어주는곳 입니다.
                    // alerts
                    mockAlerts
                  }
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
