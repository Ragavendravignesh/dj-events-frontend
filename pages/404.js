import Layout from '@/components/Layout'
import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa'
import styles from '@/styles/404.module.css'

export default function PageNotFound() {
  return (
    <Layout title='Dj events | Page not found'>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>
          Sorry, there is nothing here{' '}
          <Link href='/'>
            <a>Go back Home</a>
          </Link>
        </h4>
      </div>
    </Layout>
  )
}
