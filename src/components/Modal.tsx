import styled from "styled-components";

interface ModalProps {
  message: string;
  onClose: () => void;
}

export default function Modal({ message, onClose }: ModalProps) {
  return (
    <Overlay>
      <ModalContainer>
        <Message>{message}</Message>
        <ButtonWrapper>
          <ConfirmButton onClick={onClose}>확인</ConfirmButton>
        </ButtonWrapper>
      </ModalContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background: white;
  width: 540px;        
  height: 250px;       
  padding: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 메시지 위쪽, 버튼 아래쪽 */
`;

const Message = styled.p`
  font-size: 16px;
  text-align: center;
  margin: auto 0; /* 메시지가 중앙에 오도록 */
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽으로 */
  margin-top: auto;
`;

const ConfirmButton = styled.button`
  width: 120px;
  height: 48px;
  background-color: #ea4c1d;
  color: white;
  border: none;
  border-radius: 8px;   
  padding: 14px 46px;  
  cursor: pointer;

  &:hover {
    background-color: #cc3e12;
  }
`;
