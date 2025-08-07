'use client'

// app/admin/page.tsx

import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { app } from '@/lib/firebase/config'

// Shared hooks and components
import { useProjects } from '@/app/hooks/useProjects'
import { useAboutData } from '@/app/hooks/useAboutData'
import { useAuth } from './hooks/useAuth'
import ProjectsSection from '@/app/components/features/projects/ProjectsSection'

// Admin-specific components
import AdminHeader from './components/AdminHeader'
import LoginForm from './components/LoginForm'
import ProjectModal from './components/ProjectModal'
import AboutEditor from './components/AboutEditor'

// Types
import { Project } from '@/types'

const auth = getAuth(app)

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState<'projects' | 'about'>('projects')
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [showAboutEditor, setShowAboutEditor] = useState(false)
    const [loading, setLoading] = useState(true)

    // Custom hooks
    const { user, login, logout } = useAuth()
    const {
        projects,
        loadProjects,
        saveProject,
        deleteProject,
        uploadImage
    } = useProjects()
    const {
        aboutData,
        loadAboutData,
        saveAboutData
    } = useAboutData()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    await Promise.all([loadProjects(), loadAboutData()])
                } catch (error) {
                    console.error('Error loading data:', error)
                } finally {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        })
        return () => unsubscribe()
    }, [loadProjects, loadAboutData])

    const handleSaveProject = async (project: Project) => {
        await saveProject(project)
        closeModal()
    }

    const handleDeleteProject = async (projectId: string) => {
        if (!confirm('Delete this project?')) return
        await deleteProject(projectId)
        closeModal()
    }

    const handleSaveAbout = async (data: any) => {
        await saveAboutData(data)
        setShowAboutEditor(false)
    }

    const openEditor = (project?: Project) => {
        setSelectedProject(project || null)
        setShowModal(true)
    }

    const closeModal = () => {
        setSelectedProject(null)
        setShowModal(false)
    }

    if (!user) {
        return <LoginForm onLogin={login} />
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="flex justify-end p-4">
                <button
                    onClick={logout}
                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    Logout
                </button>
            </div>

            <AdminHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                projectCount={projects.length}
                onNewProject={() => openEditor()}
            />

            <div className="max-w-6xl mx-auto px-4 py-8">
                {activeTab === 'projects' && (
                    <ProjectsSection
                        projects={projects}
                        onEdit={openEditor}
                        variant="admin"
                    />
                )}

                {activeTab === 'about' && aboutData && (
                    <AboutEditor
                        aboutData={aboutData}
                        isEditing={showAboutEditor}
                        onEdit={() => setShowAboutEditor(true)}
                        onCancel={() => setShowAboutEditor(false)}
                        onSave={handleSaveAbout}
                        uploadImage={uploadImage}
                    />
                )}
            </div>

            {showModal && (
                <ProjectModal
                    project={selectedProject}
                    onSave={handleSaveProject}
                    onDelete={handleDeleteProject}
                    onClose={closeModal}
                    uploadImage={uploadImage}
                />
            )}
        </div>
    )
}