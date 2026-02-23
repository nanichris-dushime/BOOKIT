import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AUTH_STORAGE_KEY = 'bookit_auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!stored) return

    try {
      const parsed = JSON.parse(stored)
      if (parsed?.user && parsed?.userRole) {
        setUser(parsed.user)
        setUserRole(parsed.userRole)
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [])

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase()
    const isAdmin = normalizedEmail === 'nani@bookit.rw' && password === 'admin123'

    const role = isAdmin ? 'admin' : 'user'
    const nextUser = { email: normalizedEmail }

    setUser(nextUser)
    setUserRole(role)
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        user: nextUser,
        userRole: role,
      })
    )

    return { user: nextUser, role }
  }

  const logout = () => {
    setUser(null)
    setUserRole(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const value = useMemo(
    () => ({
      user,
      userRole,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, userRole]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
