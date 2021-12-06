import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from '@/styles/Modal.module.css'
import { FaTimes } from 'react-icons/fa'

export default function Modal({ show, title, children, onClose }) {
  const [browserProp, setBrowserProp] = useState(false)

  useEffect(() => setBrowserProp(true), [])

  const handleClose = (e) => {
    e.preventDefault()

    onClose()
  }

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href='#' onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <h2>{title}</h2>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null

  if (browserProp) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    )
  } else {
    return null
  }
}
