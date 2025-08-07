import React, { useState } from 'react'

interface LoginFormProps {
    onLogin: (email: string, password: string) => Promise<void>
}

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [loginError, setLoginError] = useState<string>('')
    const [loginForm, setLoginForm] = useState({ email: '', password: '' })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginError('')
        setIsLoading(true)

        try {
            await onLogin(loginForm.email, loginForm.password)
        } catch (error: any) {
            setLoginError(error.message || 'Login failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center text-black">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={loginForm.email}
                        onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        value={loginForm.password}
                        onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                        disabled={isLoading}
                    />
                </div>

                {loginError && (
                    <div className="text-red-600 mb-4 text-center text-sm">
                        {loginError}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    )
}