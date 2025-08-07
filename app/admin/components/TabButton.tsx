import React from 'react'

interface TabButtonProps {
    active: boolean
    onClick: () => void
    children: React.ReactNode
}

export default function TabButton({ active, onClick, children }: TabButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded font-medium ${active
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
        >
            {children}
        </button>
    )
}