import React from 'react'
import { Project } from '@/types'
import ProjectCard from './ProjectCard'

interface ProjectsSectionProps {
    projects: Project[]
    onEdit?: (project?: Project) => void
    onClick?: (project: Project) => void
    variant?: 'admin' | 'display'
    title?: string
}

export default function ProjectsSection({
    projects,
    onEdit,
    onClick,
    variant = 'display',
    title = 'Projects'
}: ProjectsSectionProps) {
    if (projects.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                <p>No projects found.</p>
            </div>
        )
    }

    return (
        <div>
            {title && <h2 className="text-2xl font-bold mb-6 text-black">{title}</h2>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onEdit={onEdit ? () => onEdit(project) : undefined}
                        onClick={onClick ? () => onClick(project) : undefined}
                        variant={variant}
                    />
                ))}
            </div>
        </div>
    )
}