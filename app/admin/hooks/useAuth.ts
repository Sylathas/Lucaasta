import { useState } from 'react'
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User
} from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { app } from '@/lib/firebase/config'

const auth = getAuth(app)

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)

    // Set up auth state listener
    onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser)
    })

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error('Login error:', error)
            throw error
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            setUser(null)
        } catch (error) {
            console.error('Logout error:', error)
            throw error
        }
    }

    return {
        user,
        login,
        logout
    }
}