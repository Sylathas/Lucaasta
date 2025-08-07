import React, { useState } from 'react'

interface InputProps {
    label: string
    type?: string
    value: string
    onChange: (value: string) => void
    placeholder?: string
    required?: boolean
}

export function Input({
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required
}: InputProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
                {label}
            </label>
            <input
                type={type}
                value={value || ''} // Fix null value
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
        </div>
    )
}

interface TextAreaProps {
    label: string
    value: string
    onChange: (value: string) => void
    rows?: number
    placeholder?: string
}

export function TextArea({
    label,
    value,
    onChange,
    rows = 4,
    placeholder
}: TextAreaProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
                {label}
            </label>
            <textarea
                value={value || ''} // Fix null value
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
        </div>
    )
}

interface ArrayFieldProps {
    label: string
    value: string[]
    onChange: (value: string) => void
    placeholder?: string
}

export function ArrayField({
    label,
    value,
    onChange,
    placeholder
}: ArrayFieldProps) {
    // Fix null/undefined and ensure it's always an array
    const safeValue = Array.isArray(value) ? value : (value ? [value] : [])

    return (
        <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
                {label} (one per line)
            </label>
            <textarea
                value={safeValue.join('\n')}
                onChange={(e) => onChange(e.target.value)}
                rows={4}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
        </div>
    )
}

interface ImageUploadProps {
    label: string
    currentImage?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function ImageUpload({
    label,
    currentImage,
    onChange
}: ImageUploadProps) {
    const buttonText = currentImage ? `Change ${label}` : `Upload ${label}`

    return (
        <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
                {label}
            </label>
            <div className="relative">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button
                    type="button"
                    className="w-[300px] rounded px-3 py-2 text-left bg-blue-600"
                >
                    {buttonText}
                </button>
            </div>
            {currentImage && (
                <div className="mt-2">
                    <img
                        src={currentImage}
                        alt="Current"
                        className="h-20 object-cover rounded border"
                    />
                </div>
            )}
        </div>
    )
}

// Generic Image Gallery Upload Component
interface ImageGalleryUploadProps {
    label: string
    images: string[]
    onChange: (images: string[]) => void
    uploadImage: (file: File) => Promise<string>
    uploadButtonText?: string
}

export function ImageGalleryUpload({
    label,
    images,
    onChange,
    uploadImage,
    uploadButtonText = "Upload Image"
}: ImageGalleryUploadProps) {
    const [uploading, setUploading] = useState(false)

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        try {
            const url = await uploadImage(file)
            onChange([...images, url])
        } catch (error) {
            console.error('Error uploading image:', error)
            alert('Failed to upload image')
        } finally {
            setUploading(false)
        }
    }

    const removeImage = (index: number) => {
        onChange(images.filter((_, i) => i !== index))
    }

    return (
        <div>
            <label className="block text-sm font-medium text-black mb-2">
                {label}
            </label>
            <div className="relative mb-2">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button
                    type="button"
                    disabled={uploading}
                    className="w-[300px] rounded px-3 py-2 text-left bg-blue-600"
                >
                    {uploading ? 'Uploading...' : uploadButtonText}
                </button>
            </div>

            {images.length > 0 && (
                <div>
                    <label className="block text-sm font-medium text-black mb-2">
                        {label} ({images.length})
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {images.map((url, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={url}
                                    alt={`${label} ${index + 1}`}
                                    className="w-full h-20 object-cover rounded border"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

// Date Picker Component (Month/Year only)
interface DatePickerProps {
    label: string
    value: string
    onChange: (value: string) => void
}

export function DatePicker({ label, value, onChange }: DatePickerProps) {
    // Parse current value or default to current date
    const currentDate = value ? new Date(value) : new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i + 5)

    const handleChange = (month: number, year: number) => {
        // Create date string in YYYY-MM format
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}`
        onChange(dateString)
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
                {label}
            </label>
            <div className="grid grid-cols-2 gap-2">
                <select
                    value={currentMonth}
                    onChange={(e) => handleChange(parseInt(e.target.value), currentYear)}
                    className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                    {months.map((month, index) => (
                        <option key={index} value={index}>
                            {month}
                        </option>
                    ))}
                </select>
                <select
                    value={currentYear}
                    onChange={(e) => handleChange(currentMonth, parseInt(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

// New Checkbox Group Component
interface CheckboxGroupProps {
    label: string
    options: string[]
    selectedValues: string[]
    onChange: (values: string[]) => void
}

export function CheckboxGroup({
    label,
    options,
    selectedValues,
    onChange
}: CheckboxGroupProps) {
    // Ensure selectedValues is always an array
    const safeSelectedValues = Array.isArray(selectedValues) ? selectedValues : []

    const handleChange = (optionValue: string) => {
        const newValues = safeSelectedValues.includes(optionValue)
            ? safeSelectedValues.filter(v => v !== optionValue)
            : [...safeSelectedValues, optionValue]
        onChange(newValues)
    }

    return (
        <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
                {label}
            </label>
            <div className="grid grid-cols-2 gap-2">
                {options.map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={safeSelectedValues.includes(option)}
                            onChange={() => handleChange(option)}
                            className="rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-900">{option}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}

// Rich Text Editor Component (basic markdown editor with preview)
interface RichTextEditorProps {
    label: string
    value: string
    onChange: (value: string) => void
    rows?: number
    placeholder?: string
}

export function RichTextEditor({
    label,
    value,
    onChange,
    rows = 6,
    placeholder
}: RichTextEditorProps) {
    const [showPreview, setShowPreview] = useState(false)

    // Simple markdown to HTML conversion for preview
    const markdownToHtml = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-900">
                    {label}
                </label>
                <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 text-gray-900"
                >
                    {showPreview ? 'Edit' : 'Preview'}
                </button>
            </div>

            {showPreview ? (
                <div
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 min-h-[100px] text-gray-900"
                    style={{ minHeight: `${rows * 1.5}em` }}
                >
                    <div dangerouslySetInnerHTML={{ __html: markdownToHtml(value || '') }} />
                </div>
            ) : (
                <textarea
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
            )}
            <p className="text-xs text-gray-600 mt-1">
                Use **bold** and *italic* for formatting
            </p>
        </div>
    )
}
