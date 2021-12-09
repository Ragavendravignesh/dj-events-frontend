import { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'
import { NEXT_URL } from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const register = async (user) => {
    console.log(user)
  }

  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
    } else {
      setError(data.message)
    }
  }

  const logout = async () => {
    console.log('logout')
  }

  const checkUserLoggedIn = async (user) => {
    console.log('check')
  }

  return (
    <AuthContext.Provider value={{ user, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext