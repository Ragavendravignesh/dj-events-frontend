import Layout from '@/components/Layout'
import { parseCookies } from '@/helpers/index'
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'
import DashboardEvent from '@/components/DashboardEvent'
import { useRouter } from 'next/router'

export default function dashboard({ events, token }) {
  const router = useRouter()

  const deleteEvent = async (id) => {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()

    if (!res.ok) {
      toast.error(data.message)
    } else {
      router.reload()
    }
  }

  return (
    <Layout title={'Dashboard | DJ events'}>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My events</h3>

        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  const strapiRes = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const events = await strapiRes.json()

  return {
    props: { events, token },
  }
}
