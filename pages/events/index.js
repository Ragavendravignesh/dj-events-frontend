import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import Link from 'next/link'
import EventItem from '@/components/EventItem';

export default function Home({events}) {
  return (
    <Layout title='Dj events | Events page'>
      <h1>Events</h1>

      {!events.length && <h3>No Events Found</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events/`);

  const events = await res.json();

  return {
    props: { events },
    revalidate: 1
  }
}
