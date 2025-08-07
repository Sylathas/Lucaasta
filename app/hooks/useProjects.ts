import { useState, useCallback } from 'react'
import {
    collection,
    getDocs,
    doc,
    addDoc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore'
import {
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage'
import { db, storage } from '@/lib/firebase/config'
import { Project } from '@/types'

export function useProjects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const loadProjects = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const snapshot = await getDocs(collection(db, 'projects'))
            const projectsData: Project[] = []
            snapshot.forEach((doc) => {
                projectsData.push({ id: doc.id, ...doc.data() } as Project)
            })
            setProjects(projectsData)
        } catch (err) {
            console.error('Error loading projects:', err)
            setError('Failed to load projects')
        } finally {
            setLoading(false)
        }
    }, [])

    const saveProject = useCallback(async (project: Project) => {
        setError(null)
        try {
            const { id, ...projectData } = project
            if (project.id) {
                await updateDoc(doc(db, 'projects', project.id), projectData)
            } else {
                await addDoc(collection(db, 'projects'), projectData)
            }
            await loadProjects() // Refresh the list
        } catch (err) {
            console.error('Error saving project:', err)
            setError('Failed to save project')
            throw err
        }
    }, [loadProjects])

    const deleteProject = useCallback(async (projectId: string) => {
        setError(null)
        try {
            await deleteDoc(doc(db, 'projects', projectId))
            await loadProjects() // Refresh the list
        } catch (err) {
            console.error('Error deleting project:', err)
            setError('Failed to delete project')
            throw err
        }
    }, [loadProjects])

    const uploadImage = useCallback(async (file: File): Promise<string> => {
        setError(null)
        try {
            const storageRef = ref(storage, `images/${Date.now()}_${file.name}`)
            await uploadBytes(storageRef, file)
            return await getDownloadURL(storageRef)
        } catch (err) {
            console.error('Error uploading image:', err)
            setError('Failed to upload image')
            throw err
        }
    }, [])

    return {
        projects,
        loading,
        error,
        loadProjects,
        saveProject,
        deleteProject,
        uploadImage
    }
}