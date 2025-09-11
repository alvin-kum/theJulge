import styled, { css } from "styled-components";

interface Props {
  $type: "customized" | "entire" | "owner";
}

export const ListWrap = styled.ul<Props>`
  display: flex;
  gap: 0.4rem;
  justify-content: flex-start;

  @media (min-width: 768px) {
    gap: 1.4rem;
  }

  @media (min-width: 1200px) {
    gap: 1.4rem;
  }
  ${({ $type }) =>
    ($type === "entire" || $type === "owner") &&
    css`
      display: grid;
      grid-template-columns: 171px 171px;
      column-gap: 8px;
      row-gap: 16px;

      @media (min-width: 768px) {
        grid-template-columns: 312px 312px;
        column-gap: 14px;
        row-gap: 32px;
      }

      @media (min-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
        column-gap: 14px;
        row-gap: 32px;
      }
    `}
`;

export const Postlist = styled.li``;

// .entire,
// .owner {
//   display: grid;
//   grid-template-columns: 17.1rem 17.1rem;
//   column-gap: 0.8rem;
//   row-gap: 1.6rem;

//   @media (min-width: 768px) {
//     grid-template-columns: 31.2rem 31.2rem;
//     column-gap: 1.4rem;
//     row-gap: 3.2rem;
//   }

//   @media (min-width: 1200px) {
//     grid-template-columns: repeat(3, 1fr);
//     column-gap: 1.4rem;
//     row-gap: 3.2rem;
//   }
// }
