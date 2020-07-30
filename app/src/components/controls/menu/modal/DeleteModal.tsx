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
  margin-top: 0.5rem;
`

const ModalButtonContainer = styled.div`
  margin-top: 1rem;
`

const ModalButton = styled.button<{ isConfirm?: boolean }>`
  background-color: ${({ isConfirm }) =>
    isConfirm ? colors.buttons.default : 'white'};
  color: ${({ isConfirm }) => (isConfirm ? 'white' : 'black')};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: ${colors.buttons.hover};
  }
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
      </Modal>
      <Overlay isOpen={isOpen} onClick={modalClose} />
    </>
  )
}

export default DeleteModal
