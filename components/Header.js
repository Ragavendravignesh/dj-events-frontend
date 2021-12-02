import Link from 'next/link'
import styles from '../styles/Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>DJ events</a>
        </Link>
      </div>
      <ul>
        <li>
          <Link href='/events'>
            <a>Events</a>
          </Link>
        </li>
      </ul>
    </header>
  )
}