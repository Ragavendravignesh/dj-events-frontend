import Layout from '@/components/Layout'
import { parseCookies } from '@/helpers/index'
import { API_URL } from '@/config/index'

export default function dashboard({ events }) {
  console.log(events)
  return (
    <Layout title={'Dashboard | DJ events'}>
      <h1>DJ events Dashboard</h1>
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
