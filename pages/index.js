import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import Link from 'next/link'
import EventItem from '@/components/EventItem'

export default function Home({ events }) {
  return (
    <Layout title='Dj events | Home page'>
      <h1>Upcoming events</h1>

      {!events.length && <h3>No Events Found</h3>}

      {events.length && events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View all events</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)

  const events = await res.json()

  return {
    props: { events: events },
    revalidate: 1,
  }
}
