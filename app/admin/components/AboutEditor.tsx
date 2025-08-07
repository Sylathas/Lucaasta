// app/admin/components/AboutEditor.tsx
import React, { useState, useEffect } from 'react'
import { AboutData } from '@/types'
import { Input, TextArea, ArrayField, RichTextEditor } from './FormComponents'

interface AboutEditorProps {
    aboutData: AboutData
    isEditing: boolean
    onEdit: () => void
    onCancel: () => void
    onSave: (data: AboutData) => void
    uploadImage: (file: File) => Promise<string>
}

export default function AboutEditor({
    aboutData,
    isEditing,
    onEdit,
    onCancel,
    onSave,
    uploadImage
}: AboutEditorProps) {
    const [formData, setFormData] = useState<AboutData>(aboutData)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        setFormData(aboutData)
    }, [aboutData])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            await onSave(formData)
        } catch (error) {
            console.error('Error saving about data:', error)
            alert('Failed to save about information')
        } finally {
            setSaving(false)
        }
    }

    const updateArrayField = (field: keyof AboutData, value: string) => {
        const values = value.split('\n').filter(v => v.trim())
        setFormData(prev => ({ ...prev, [field]: values }))
    }

    if (!isEditing) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm border text-black">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">About Section</h2>
                    <button
                        onClick={onEdit}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Edit About
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-lg mb-2">Contact Information</h3>
                            <div className="space-y-2 text-sm">
                                {aboutData.contact_email && (
                                    <p><strong>Email:</strong> {aboutData.contact_email}</p>
                                )}
                                {aboutData.instagram && (
                                    <p><strong>Instagram:</strong> {aboutData.instagram}</p>
                                )}
                                {aboutData.vimeo && (
                                    <p><strong>Vimeo:</strong> {aboutData.vimeo}</p>
                                )}
                            </div>
                        </div>

                        {aboutData.contact && (
                            <div>
                                <h3 className="font-medium mb-2">Additional Contact</h3>
                                <div className="whitespace-pre-wrap text-sm">{aboutData.contact}</div>
                            </div>
                        )}
                    </div>

                    {/* Bio */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-lg mb-2">Short Bio</h3>
                            <p className="text-sm">{aboutData.short_bio}</p>
                        </div>
                    </div>
                </div>

                {/* Long Bio */}
                {aboutData.long_bio && (
                    <div className="mt-6 pt-6 border-t">
                        <h3 className="font-medium text-lg mb-3">Long Bio</h3>
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {aboutData.long_bio}
                        </div>
                    </div>
                )}

                {/* Lists */}
                <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {aboutData.education && aboutData.education.length > 0 && (
                        <div>
                            <h3 className="font-medium mb-2">Education</h3>
                            <ul className="space-y-1 text-sm">
                                {aboutData.education.map((item, index) => (
                                    <li key={index} className="text-gray-700">• {item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {aboutData.awards && aboutData.awards.length > 0 && (
                        <div>
                            <h3 className="font-medium mb-2">Awards</h3>
                            <ul className="space-y-1 text-sm">
                                {aboutData.awards.map((item, index) => (
                                    <li key={index} className="text-gray-700">• {item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {aboutData.exhibitions_events && aboutData.exhibitions_events.length > 0 && (
                        <div>
                            <h3 className="font-medium mb-2">Exhibitions & Events</h3>
                            <ul className="space-y-1 text-sm">
                                {aboutData.exhibitions_events.map((item, index) => (
                                    <li key={index} className="text-gray-700">• {item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {aboutData.film_festival_screenings && aboutData.film_festival_screenings.length > 0 && (
                        <div>
                            <h3 className="font-medium mb-2">Film Festival Screenings</h3>
                            <ul className="space-y-1 text-sm">
                                {aboutData.film_festival_screenings.map((item, index) => (
                                    <li key={index} className="text-gray-700">• {item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {aboutData.residencies && aboutData.residencies.length > 0 && (
                        <div>
                            <h3 className="font-medium mb-2">Residencies</h3>
                            <ul className="space-y-1 text-sm">
                                {aboutData.residencies.map((item, index) => (
                                    <li key={index} className="text-gray-700">• {item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {aboutData.press_online && aboutData.press_online.length > 0 && (
                        <div>
                            <h3 className="font-medium mb-2">Press & Online</h3>
                            <ul className="space-y-1 text-sm">
                                {aboutData.press_online.map((item, index) => (
                                    <li key={index} className="text-gray-700">• {item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-black">Edit About Section</h2>
                <button
                    onClick={onCancel}
                    className="text-gray-600 hover:text-black"
                >
                    Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-black">Contact Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Contact Email"
                            type="email"
                            value={formData.contact_email}
                            onChange={(value) => setFormData(prev => ({ ...prev, contact_email: value }))}
                            placeholder="your@email.com"
                        />
                        <Input
                            label="Instagram"
                            value={formData.instagram}
                            onChange={(value) => setFormData(prev => ({ ...prev, instagram: value }))}
                            placeholder="@yourusername"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Vimeo Profile"
                            type="url"
                            value={formData.vimeo}
                            onChange={(value) => setFormData(prev => ({ ...prev, vimeo: value }))}
                            placeholder="https://vimeo.com/username"
                        />
                        <TextArea
                            label="Additional Contact Info"
                            value={formData.contact}
                            onChange={(value) => setFormData(prev => ({ ...prev, contact: value }))}
                            rows={3}
                            placeholder="Phone, address, or other contact details"
                        />
                    </div>
                </div>

                {/* Bio */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-black">Biography</h3>

                    <TextArea
                        label="Short Bio"
                        value={formData.short_bio}
                        onChange={(value) => setFormData(prev => ({ ...prev, short_bio: value }))}
                        rows={3}
                        placeholder="Brief description for homepage and previews"
                    />

                    <RichTextEditor
                        label="Long Bio"
                        value={formData.long_bio}
                        onChange={(value) => setFormData(prev => ({ ...prev, long_bio: value }))}
                        rows={8}
                        placeholder="Detailed biography. Use **bold** and *italic* for formatting."
                    />
                </div>

                {/* Professional Information */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-black">Professional Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ArrayField
                            label="Education"
                            value={formData.education}
                            onChange={(value) => updateArrayField('education', value)}
                            placeholder="2020 - MFA Photography, School Name&#10;2018 - BA Art, University Name"
                        />
                        <ArrayField
                            label="Awards"
                            value={formData.awards}
                            onChange={(value) => updateArrayField('awards', value)}
                            placeholder="2023 - Photography Prize, Institution&#10;2022 - Grant Award, Foundation"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ArrayField
                            label="Exhibitions & Events"
                            value={formData.exhibitions_events}
                            onChange={(value) => updateArrayField('exhibitions_events', value)}
                            placeholder="2023 - Solo Show, Gallery Name, City&#10;2022 - Group Exhibition, Museum, City"
                        />
                        <ArrayField
                            label="Film Festival Screenings"
                            value={formData.film_festival_screenings}
                            onChange={(value) => updateArrayField('film_festival_screenings', value)}
                            placeholder="2023 - Cannes Film Festival&#10;2022 - Sundance Film Festival"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ArrayField
                            label="Residencies"
                            value={formData.residencies}
                            onChange={(value) => updateArrayField('residencies', value)}
                            placeholder="2023 - Artist Residency, Location&#10;2022 - Summer Residency, Institution"
                        />
                        <ArrayField
                            label="Press & Online Features"
                            value={formData.press_online}
                            onChange={(value) => updateArrayField('press_online', value)}
                            placeholder="2023 - Featured in Magazine Name&#10;2022 - Interview with Website"
                        />
                    </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        {saving ? 'Saving Changes...' : 'Save About Information'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}