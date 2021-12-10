import styles from '@/styles/DashboardEvent.module.css'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'

export default function DashboardEvent({ evt, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>{evt.name}</h4>

      <Link href={`/events/edit/${evt.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt />
          Edit event
        </a>
      </Link>

      <a href='#' className={styles.delete} onClick={() => handleDelete(evt.id)}>
        <FaTimes />
        Delete event
      </a>
    </div>
  )
}
