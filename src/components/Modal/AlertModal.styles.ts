import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 20px; 
  box-sizing: border-box; 
`;

export const ModalContent = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  text-align: center;
  width: 327px;
  height: 220px;
  padding: 20px;

  display: flex;              
  flex-direction: column;     
  justify-content: space-between;    
  align-items: center;                        

  font-size: 16px;
  font-weight: 500;
  line-height: 100%;

    @media (min-width: 768px) {
    width: 540px;
  }
`;

export const ModalMessage = styled.p`
  flex: 1;                     
  display: flex;
  justify-content: center;     
  align-items: center;         
  margin: 0;
`;

export const ConfirmButton = styled.button`
  width: 138px;
  height: 42px;
  padding: 12px 56px;
  border: none;
  border-radius: 8px;
  background: #EA3C12;
  
  color: #FFFFFF;
  cursor: pointer;
`;
