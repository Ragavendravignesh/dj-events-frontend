import Layout from '@/components/Layout'
import { parseCookies } from '@/helpers/index'
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'
import DashboardEvent from '@/components/DashboardEvent'

export default function dashboard({ events }) {
  const deleteEvent = (id) => {
    console.log(id)
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
    props: { events },
  }
}
