import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'developement',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      })
    )

    res.status(200).json({ message: 'Success' })
  } else {
    res.setHeader('Allowed', ['POST'])
    res.status(400).json({ message: `Method is ${req.method} is not allowed` })
  }
}
