import React from 'react'
import { Project } from '@/types'
import { Timestamp } from 'firebase/firestore'
import Image from 'next/image'

interface ProjectCardProps {
    project: Project
    onEdit?: () => void
    onClick?: () => void
    variant?: 'admin' | 'display'
    showEditButton?: boolean
}

export default function ProjectCard({
    project,
    onEdit,
    onClick,
    variant = 'display',
    showEditButton = false
}: ProjectCardProps) {
    const handleClick = () => {
        if (variant === 'admin' && onEdit) {
            onEdit()
        } else if (onClick) {
            onClick()
        }
    }

    return (
        <div
            className={`bg-white p-4 rounded-lg shadow-sm border transition-shadow text-black ${(onEdit || onClick) ? 'hover:shadow-md cursor-pointer' : ''
                }`}
            onClick={handleClick}
        >
            {project.cover_image && (
                <Image
                    src={project.cover_image}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="w-full h-32 object-cover rounded mb-3"
                />
            )}
            <h3 className="font-medium text-lg mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
                {project.date instanceof Timestamp
                    ? project.date.toDate().toLocaleDateString()
                    : project.date}
            </p>
            <div className="flex flex-wrap gap-1">
                {project.project_type.map((type, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {type}
                    </span>
                ))}
            </div>
            {showEditButton && variant === 'admin' && (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onEdit?.()
                    }}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                    Edit
                </button>
            )}
        </div>
    )
}