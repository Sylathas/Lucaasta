import { Timestamp } from 'firebase/firestore'

export interface Project {
    id?: string
    title: string
    project_text: string
    project_type: string[]
    date: string | Timestamp
    details: string
    credits: string
    cover_image: string
    images: string[]
    awards: string[]
    vimeo_urls: string[]
    youtube_urls: string[]
}

export interface AboutData {
    short_bio: string
    long_bio: string
    contact: string
    contact_email: string
    instagram: string
    vimeo: string
    awards: string[]
    education: string[]
    exhibitions_events: string[]
    film_festival_screenings: string[]
    press_online: string[]
    residencies: string[]
}
