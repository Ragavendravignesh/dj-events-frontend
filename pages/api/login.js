import { API_URL } from '@/config/index'

export default async (req, res) => {
  const { identifier, password } = req.body

  if (req.method === 'POST') {
    const strapiRes = await fetch(`${API_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    })

    const data = await strapiRes.json()

    if (strapiRes.ok) {
      res.status(200).json({ user: data.user })
    } else {
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message })
    }
  } else {
    res.setHeader('Allowed', ['POST'])
    res.status(200).json({ message: `Method ${req.method} is not allowed` })
  }
}
