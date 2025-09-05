import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  width: 110px;
  box-sizing: border-box;
  cursor: pointer;
`;

export const DropdownHeader = styled.div<{ $isOpen: boolean }>`
  height: 30px;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #F2F2F3;
  
  font-size: 14px;
  font-weight: 700;
  color: #111322;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;   
  overflow: hidden;      
  text-overflow: ellipsis; 

  &::after {
    content: "${(props) => (props.$isOpen ? '▲' : '▼')}";
    display: inline-block;
    font-size: 10px;
    padding-left: 8px;
  }
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #E5E4E7;
  border-radius: 5px;
  background-color: #ffffff;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0px 4px 25px 0px #0000001A;
  box-sizing: border-box;
`;

export const DropdownItem = styled.li<{ selected?: boolean }>`
  padding: 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #111322;
  background-color: ${(props) => (props.selected ? "#f0f0f0" : "#fff")};

  &:hover {
    background-color: #F2F2F3;
  }
`;
