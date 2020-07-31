import React from 'react'
import styled from 'styled-components'
import colors from '../../../../config/colors'
import request from '../../../../utils/request'

const Modal = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  left: 0;
  right: 0;
  top: 1rem;
  margin: auto;
  width: 30rem;
  height: 20rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  z-index: 3;
`

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  background-color: rgba(1, 1, 1, 0.3);
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 2;
`

const ModalText = styled.p`
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  margin: auto;
`

const ModalButton = styled.button<{ isConfirm?: boolean }>`
  background-color: ${({ isConfirm }) =>
    isConfirm ? colors.buttons.default : 'white'};
  color: ${({ isConfirm }) => (isConfirm ? 'white' : 'black')};
  border-radius: 0.5rem;
  border: solid 0.02rem
    ${({ isConfirm }) => (isConfirm ? colors.buttons.default : '#888')};
  padding: 0.5rem 1rem;
  &:hover {
    background-color: ${({ isConfirm }) =>
      isConfirm ? colors.buttons.hover : '#ddd'};
  }
`

const ModalButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  ${ModalButton}:not(:last-child) {
    margin-right: 1rem;
  }
`

const ModalContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

type OverlayProps = {
  isOpen: boolean
  modalClose: () => void
}

type ModalProps = OverlayProps & {
  roomId: string
}

const DeleteModal: React.FC<ModalProps> = ({ roomId, isOpen, modalClose }) => {
  const deleteLog = async () => {
    await request.delete(`/api/rooms/${roomId}`)
    modalClose()
  }

  return (
    <>
      <Modal isOpen={isOpen}>
        <ModalContent>
          <ModalText>{'本当に削除しますか？'}</ModalText>
          <ModalButtonContainer>
            <ModalButton
              type="button"
              isConfirm={true}
              onClick={() => deleteLog()}>
              {'削除する'}
            </ModalButton>
            <ModalButton type="button" onClick={modalClose}>
              {'キャンセル'}
            </ModalButton>
          </ModalButtonContainer>
        </ModalContent>
      </Modal>
      <Overlay isOpen={isOpen} onClick={modalClose} />
    </>
  )
}

export default DeleteModal
