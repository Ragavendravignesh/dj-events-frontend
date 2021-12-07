import Layout from '@/components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '@/styles/Form.module.css'
import { API_URL } from '@/config/index'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import { FaImage } from 'react-icons/fa'
import moment from 'moment'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

export default function AddEvent({ evt }) {
  const router = useRouter()
  const [values, setValues] = useState({
    name: evt.name,
    venue: evt.venue,
    address: evt.description,
    performers: evt.performers,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  })

  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.thumbnail.url : null
  )

  const [showModal, setShowModal] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const hasEmptyValues = Object.values(values).some(
      (element) => element === ''
    )

    if (hasEmptyValues) {
      toast.error('Please fill all the details')
    } else {
      console.log(values)
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        toast.error('Something went wrong')
      } else {
        const evt = await res.json()
        router.push(`/events/${evt.slug}`)
      }
    }
  }

  const handleImageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${evt.id}`)
    const data = await res.json()

    setImagePreview(data.image.formats.thumbnail.url)
    setShowModal(false)
  }

  return (
    <Layout title='DJ events | Add events'>
      <Link href='/events'>Go back</Link>
      <h1>Add event page</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input
              type='text'
              id='venue'
              name='venue'
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              id='address'
              name='address'
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              id='performers'
              name='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='date'>Event Date</label>
            <input
              type='date'
              id='date'
              name='date'
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='time'>Event Time</label>
            <input
              type='text'
              id='time'
              name='time'
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
            value={values.description}
            onChange={handleInputChange}
          />
        </div>
        <input type='submit' className='btn' value='Update event' />
      </form>
      <h2>Image preview</h2>
      {imagePreview && <Image src={imagePreview} height={100} width={200} />}

      <div>
        <button className='btn-secondary' onClick={() => setShowModal(true)}>
          <FaImage />
          Change image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={handleImageUploaded} />
      </Modal>
    </Layout>
  )
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/events/${id}`)

  const evt = await res.json()

  return {
    props: { evt },
  }
}
