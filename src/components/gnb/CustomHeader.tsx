import Image from "next/image";
import style from "./CustomHeader.module.css";

const CustomHeader = () => {
  return (
    <header className={style.header}>
      <Image
        className={style.logo}
        src={"/logo.svg"}
        width={112}
        height={40}
        alt="더줄게 로고"
        onClick={() => {}}
        priority
      />
      <div className={style["search-container"]}>
        <Image
          className={style["search-btn"]}
          src={"/search.svg"}
          width={20}
          height={20}
          alt="찾기 버튼"
          onClick={() => {}}
        />
        <input
          className={style["search-input"]}
          type="text"
          value=""
          onChange={() => {}}
          onKeyDown={() => {}}
          placeholder="가게 이름으로 찾아보세요"
        ></input>
      </div>
      <div className={style["nav-right-btn-container"]}>
        <h3 className={style["right-first-btn"]}>내 가게</h3>
        <h3 className={style["right-second-btn"]}>로그아웃</h3>
        {true && (
          <Image
            className={style["alert-icon"]}
            src={false ? "/alert-active.svg" : "/alert-inactive.svg"}
            width={24}
            height={24}
            alt="알림 버튼"
            onClick={() => {}}
          />
        )}
      </div>
    </header>
  );
};

export default CustomHeader;
