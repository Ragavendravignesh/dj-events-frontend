import Layout from '@/components/Layout'
import { API_URL, PER_PAGE } from '@/config/index'
import EventItem from '@/components/EventItem'
import Pagination from '@/components/Pagination'

export default function EventsPage({ events, page, total }) {
  return (
    <Layout title='Dj events | Events page'>
      <h1>Events</h1>

      {!events.length && <h3>No Events Found</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const skip = +page === 0 ? 0 : (+page - 1) * PER_PAGE

  const res = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${skip}`
  )
  const events = await res.json()

  const totalRes = await fetch(`${API_URL}/events/count`)
  const totalCount = await totalRes.json()

  const total = Math.ceil(totalCount / PER_PAGE)

  return {
    props: { events, page: +page, total },
  }
}
