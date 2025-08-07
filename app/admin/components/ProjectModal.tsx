// app/admin/components/ProjectModal.tsx
import React, { useState } from 'react'
import { Project } from '@/types'
import { Timestamp } from 'firebase/firestore'
import { Input, TextArea, ArrayField, ImageUpload, CheckboxGroup, RichTextEditor, ImageGalleryUpload, DatePicker } from './FormComponents'

interface ProjectModalProps {
    project: Project | null
    onSave: (project: Project) => void
    onDelete: (id: string) => void
    onClose: () => void
    uploadImage: (file: File) => Promise<string>
}

const emptyProject: Project = {
    title: '',
    project_text: '',
    project_type: [],
    date: '',
    details: '',
    credits: '',
    cover_image: '',
    images: [],
    awards: [],
    vimeo_urls: [],
    youtube_urls: []
}

export default function ProjectModal({
    project,
    onSave,
    onDelete,
    onClose,
    uploadImage
}: ProjectModalProps) {
    const [formData, setFormData] = useState<Project>(project || emptyProject)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)

    const projectTypeOptions = [
        'Photography',
        'Performance',
        'Sculpture',
        'Drawing',
        'Publication',
        'Artist Film',
        'Commercial Film'
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            await onSave(formData)
        } catch (error) {
            console.error('Error saving project:', error)
        } finally {
            setSaving(false)
        }
    }

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'cover_image'
    ) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        try {
            const url = await uploadImage(file)
            if (field === 'cover_image') {
                setFormData(prev => ({ ...prev, cover_image: url }))
            }
        } catch (error) {
            console.error('Error uploading image:', error)
            alert('Failed to upload image')
        } finally {
            setUploading(false)
        }
    }

    const updateArrayField = (field: keyof Project, value: string) => {
        const values = value.split('\n').filter(v => v.trim())
        setFormData(prev => ({ ...prev, [field]: values }))
    }

    const handleDelete = async () => {
        if (!project?.id) return
        if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) return

        try {
            await onDelete(project.id)
        } catch (error) {
            console.error('Error deleting project:', error)
            alert('Failed to delete project')
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] overflow-y-auto relative">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-black z-10">
                        {project ? 'Edit Project' : 'New Project'}
                    </h2>
                    <div className="flex items-center gap-2">
                        {project && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-black text-xl font-bold w-8 h-8 flex items-center justify-center"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-black">Basic Information</h3>

                        <Input
                            label="Project Title"
                            value={formData.title}
                            onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                            placeholder="Enter project title"
                            required
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DatePicker
                                label="Project Date"
                                value={formData.date instanceof Timestamp
                                    ? formData.date.toDate().toISOString().split('T')[0]
                                    : formData.date
                                }
                                onChange={(value) => setFormData(prev => ({ ...prev, date: value }))}
                            />
                            <CheckboxGroup
                                label="Project Types"
                                options={projectTypeOptions}
                                selectedValues={Array.isArray(formData.project_type) ? formData.project_type : []}
                                onChange={(values) => setFormData(prev => ({ ...prev, project_type: values }))}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-black">Content</h3>

                        <RichTextEditor
                            label="Project Description"
                            value={formData.project_text}
                            onChange={(value) => setFormData(prev => ({ ...prev, project_text: value }))}
                            rows={6}
                            placeholder="Describe your project. Use **bold** and *italic* for formatting."
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextArea
                                label="Details"
                                value={formData.details}
                                onChange={(value) => setFormData(prev => ({ ...prev, details: value }))}
                                rows={4}
                                placeholder="Additional project details"
                            />
                            <TextArea
                                label="Credits"
                                value={formData.credits}
                                onChange={(value) => setFormData(prev => ({ ...prev, credits: value }))}
                                rows={4}
                                placeholder="Credits and collaborators"
                            />
                        </div>
                    </div>

                    {/* Images */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-black">Images</h3>

                        <ImageUpload
                            label="Cover Image"
                            currentImage={formData.cover_image}
                            onChange={(e) => handleImageUpload(e, 'cover_image')}
                        />

                        <ImageGalleryUpload
                            label="Additional Images"
                            images={Array.isArray(formData.images) ? formData.images : []}
                            onChange={(images) => setFormData(prev => ({ ...prev, images }))}
                            uploadImage={uploadImage}
                            uploadButtonText="Upload Project Image"
                        />
                    </div>

                    {/* Media & Recognition */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-black">Media & Recognition</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ImageGalleryUpload
                                label="Awards"
                                images={Array.isArray(formData.awards) ? formData.awards : []}
                                onChange={(images) => setFormData(prev => ({ ...prev, awards: images }))}
                                uploadImage={uploadImage}
                                uploadButtonText="Upload Award Image"
                            />
                            <ArrayField
                                label="Vimeo URLs"
                                value={formData.vimeo_urls}
                                onChange={(value) => updateArrayField('vimeo_urls', value)}
                                placeholder="https://vimeo.com/123456789&#10;https://vimeo.com/987654321"
                            />
                        </div>

                        <ArrayField
                            label="YouTube URLs"
                            value={formData.youtube_urls}
                            onChange={(value) => updateArrayField('youtube_urls', value)}
                            placeholder="https://youtube.com/watch?v=abc123&#10;https://youtube.com/watch?v=def456"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="sticky bottom-0 bg-white border-t pt-4">
                        <button
                            type="submit"
                            disabled={saving || uploading}
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            {saving ? 'Saving Project...' : 'Save Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}