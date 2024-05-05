import { useState } from 'react'
import styles from './buyButton.module.css'

const BuyButton: React.FC = () => {
  const [showPopover, setShowPopover] = useState(true)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const togglePopover = () => {
    setShowPopover(!showPopover)
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        className={styles.btn}
        onClick={togglePopover}
      >
        Comprar
      </button>
      {(Boolean(showPopover)) && (
        <div
          style={
            {
              position: 'absolute',
              top: '0',
              right: '0',
              transform: 'translate(100%, 0%)',
              border: '1px solid black',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '-webkit-fill-available'
            }
          }
        >
          <button
            className={styles.buyButton}
            onClick={() => { console.log('Button 1 clicked') }}
          >
            Button 1
          </button>
          <button
            className={styles.buyButton}
            onClick={() => { console.log('Button 2 clicked') }}
          >
            Button 2
          </button>
        </div>
      )}
    </div>
  )
}

export default BuyButton

// import { useRef, useState } from 'react'
// import styles from './buyButton.module.css'

// interface ModalProps {
//   buttons: Array<{ label: string, onClick: () => void }>
//   onClose: () => void
//   isOpen: boolean
//   position: { top: number, left: number }
// }

// const Modal: React.FC<ModalProps> = ({ buttons, onClose, position, isOpen }) => {
//   const style: React.CSSProperties = {
//     position: 'absolute',
//     top: position.top,
//     left: position.left
//   }

//   return isOpen && (
//     <div style={style}>
//       <button onClick={onClose}>Close</button>
//       {buttons.map((button, index) => (
//         <button key={index} onClick={button.onClick}>{button.label}</button>
//       ))}
//     </div>
//   )
// }

// const BuyButton: React.FC = () => {
//   const [modalOpen, setModalOpen] = useState(false)
//   const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 })
//   const buttonRef = useRef<HTMLButtonElement>(null)

//   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//   const openModal = () => {
//     if (buttonRef.current != null) {
//       const buttonRect = buttonRef.current.getBoundingClientRect()
//       console.log(buttonRect)
//       setButtonPosition({ top: buttonRect.top, left: buttonRect.left })
//       setModalOpen(true)
//     }
//   }

//   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//   const closeModal = () => {
//     setModalOpen(false)
//   }

//   const modalButtons = [
//     { label: 'Button 1', onClick: () => { console.log('Button 1 clicked') } },
//     { label: 'Button 2', onClick: () => { console.log('Button 2 clicked') } }
//   ]
//   return (
//     <>
//       <button
//         className={styles.btn}
//         onClick={openModal}
//         ref={buttonRef}
//       >
//         Comprar
//       </button>
//       {
//         modalOpen && (
//           <Modal
//             buttons={modalButtons}
//             onClose={closeModal}
//             position={buttonPosition}
//             isOpen={modalOpen}
//           />
//         )
//       }
//     </>
//   )
// }

// export default BuyButton
