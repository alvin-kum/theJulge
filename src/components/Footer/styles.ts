import styled from "styled-components";

/* ---------- Footer Wrapper ---------- */
export const FooterWrapper = styled.footer`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  background-color: #F2F2F3;
  font-size: 14px;
  font-weight: 400;
  color: #7D7986;
  
  width: 100%;
  max-width: 100%;       // 화면 확장 시 계속 늘어나도록
  padding: 32px 12px 16px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
`;

/* ---------- Privacy / FAQ ---------- */
export const FooterPrivacy = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  white-space: nowrap;
  order: 1; /* 모바일: 첫 번째 */

  p {
    margin: 0;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (min-width: 768px) {
    justify-content: center;
    order: 2; /* 태블릿 이상: 두 번째 */
  }
`;

/* ---------- SNS Icons ---------- */
export const FooterSNS = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  order: 2; /* 모바일: 두 번째 */

  a {
    display: inline-flex;
    width: 25px;
    height: 25px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &:hover {
      opacity: 0.8;
    }
  }

  @media (min-width: 768px) {
    order: 3; /* 태블릿 이상: 세 번째 */
  }
`;

/* ---------- Copyright ---------- */
export const FooterCodeit = styled.div`
  flex: 1 0 100%; /* 모바일: 전체 너비 */
  font-size: 12px;
  text-align: left;
  order: 3; /* 모바일: 세 번째 */

  @media (min-width: 768px) {
    flex: 1;
    font-size: 16px;
    text-align: left;
    order: 1; /* 태블릿 이상: 첫 번째 */
  }
`;