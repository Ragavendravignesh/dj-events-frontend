import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

export default function Home({events}) {
  console.log(events)
  return (
    <Layout title='Dj events | Home page'>
      <h1>This is home page</h1>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events/`);

  const events = await res.json();

  return {
    props: { events },
    revalidate: 1
  }
}
