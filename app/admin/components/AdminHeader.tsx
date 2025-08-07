import React from 'react'
import TabButton from './TabButton'

interface AdminHeaderProps {
    activeTab: 'projects' | 'about'
    setActiveTab: (tab: 'projects' | 'about') => void
    projectCount: number
    onNewProject: () => void
}

export default function AdminHeader({
    activeTab,
    setActiveTab,
    projectCount,
    onNewProject
}: AdminHeaderProps) {
    return (
        <div className="bg-white shadow-sm border-b">
            <div className="max-w-6xl mx-auto px-4 py-4">
                <h1 className="text-2xl font-bold text-gray-900">CMS Admin</h1>
                <div className="mt-4 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <TabButton
                            active={activeTab === 'projects'}
                            onClick={() => setActiveTab('projects')}
                        >
                            Projects ({projectCount})
                        </TabButton>
                        <TabButton
                            active={activeTab === 'about'}
                            onClick={() => setActiveTab('about')}
                        >
                            About
                        </TabButton>
                    </div>
                    {activeTab === 'projects' && (
                        <button
                            onClick={onNewProject}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            + New Project
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}