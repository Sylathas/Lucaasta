import { useState, useCallback } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import { AboutData } from '@/types'

const ABOUT_DOC_ID = 'HFpGPPJfAgitPVWGIAKS'

export function useAboutData() {
    const [aboutData, setAboutData] = useState<AboutData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const loadAboutData = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const docRef = doc(db, 'about', ABOUT_DOC_ID)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setAboutData(docSnap.data() as AboutData)
            } else {
                setError('About data not found')
            }
        } catch (err) {
            console.error('Error loading about data:', err)
            setError('Failed to load about data')
        } finally {
            setLoading(false)
        }
    }, [])

    const saveAboutData = useCallback(async (data: AboutData) => {
        setError(null)
        try {
            await updateDoc(doc(db, 'about', ABOUT_DOC_ID), { ...data })
            setAboutData(data)
        } catch (err) {
            console.error('Error updating about data:', err)
            setError('Failed to update about data')
            throw err
        }
    }, [])

    return {
        aboutData,
        loading,
        error,
        loadAboutData,
        saveAboutData
    }
}