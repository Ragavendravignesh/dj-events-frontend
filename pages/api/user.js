import { API_URL } from '@/config/index'
import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Cookie not found' })
      return
    }

    const { token } = cookie.parse(req.headers.cookie)

    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const user = await strapiRes.json()

    res.status(200).json({ user })
  } else {
    res.setHeader('Allowed', ['GET'])
    res.status(400).json({ message: `Method is ${req.method} not allowed` })
  }
}
