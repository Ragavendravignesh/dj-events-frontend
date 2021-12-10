import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import styles from '@/styles/event.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function EventPage({ event }) {
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(event.date).toLocaleDateString('en-US')} at {event.time}
        </span>
        <h1>{event.name}</h1>
        <ToastContainer />

        {event.image && (
          <div className={styles.image}>
            <Image
              src={event.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <Link href={'/events'}>
          <a className={styles.back}>{'<'} Go back</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`)

  const events = await res.json()

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`)

  const event = await res.json()

  return { props: { event: event[0] }, revalidate: 1 }
}

// export async function getServerSideProps ({ query : { slug }}) {
//     const res = await fetch(`${API_URL}/api/events/${slug}`);

//     const event = await res.json();
//     console.log(event);

//     return {
//         props : {
//             event: event[0]
//         }
//     }
// }
