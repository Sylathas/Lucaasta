import React from 'react'
import { useAboutData } from '@/app/hooks/useAboutData'

export default function AboutDisplay() {
    const { aboutData, loading } = useAboutData()

    if (loading) {
        return <div className="p-6">Loading about information...</div>
    }

    if (!aboutData) {
        return <div className="p-6 text-black">About information not available.</div>
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">About</h2>

            <div className="space-y-6">
                <div>
                    <p className="text-lg leading-relaxed">{aboutData.short_bio}</p>
                </div>

                {aboutData.long_bio && (
                    <div className="prose max-w-none">
                        <div className="whitespace-pre-wrap">{aboutData.long_bio}</div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Contact</h3>
                        <div className="space-y-2">
                            {aboutData.contact_email && (
                                <p>
                                    <a
                                        href={`mailto:${aboutData.contact_email}`}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {aboutData.contact_email}
                                    </a>
                                </p>
                            )}
                            {aboutData.instagram && (
                                <p>
                                    <a
                                        href={`https://instagram.com/${aboutData.instagram.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        {aboutData.instagram}
                                    </a>
                                </p>
                            )}
                            {aboutData.vimeo && (
                                <p>
                                    <a
                                        href={aboutData.vimeo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Vimeo
                                    </a>
                                </p>
                            )}
                        </div>
                    </div>

                    {aboutData.awards && aboutData.awards.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-lg mb-3">Awards</h3>
                            <ul className="space-y-1">
                                {aboutData.awards.map((award, index) => (
                                    <li key={index} className="text-sm">{award}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {aboutData.education && aboutData.education.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Education</h3>
                        <ul className="space-y-1">
                            {aboutData.education.map((edu, index) => (
                                <li key={index} className="text-sm">{edu}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {aboutData.exhibitions_events && aboutData.exhibitions_events.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Exhibitions & Events</h3>
                        <ul className="space-y-1">
                            {aboutData.exhibitions_events.map((event, index) => (
                                <li key={index} className="text-sm">{event}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {aboutData.film_festival_screenings && aboutData.film_festival_screenings.length > 0 && (
                    <div>
                        <h3 className="font-semibold text-lg mb-3">Film Festival Screenings</h3>
                        <ul className="space-y-1">
                            {aboutData.film_festival_screenings.map((screening, index) => (
                                <li key={index} className="text-sm">{screening}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}