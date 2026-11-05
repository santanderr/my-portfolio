import activityTrackerCardImg from '../assets/images/activity_tracker_mockup.png'
import activityTrackerDetailImg from '../assets/images/ActivityTracker.png'
import aircraftViewerCardImg from '../assets/images/Aircraft_Viewer.png'
import aircraftViewerDetailImg from '../assets/images/AircraftViewer.png'
import ventoryGoCardImg from '../assets/images/VentoryGo_Mockup.png'
import ventoryGoDetailImg from '../assets/images/VentoryGoEditor.png'

export interface Project {
    problem: string    // what gap or need the project addresses
    approach: string   
    result: string     
    id: string
    title: string
    summary: string            // one line shown on the card
    type: string               // e.g. "Android Application", shown under the popup title
    image: string              // card image
    imageAlt: string
    detailImage?: string       // popup image, falls back to `image`
    role: string[]
    teams: { label: string; url?: string }[]
    start: string              // 'YYYY-MM'
    end?: string               // 'YYYY-MM'; omitted = still ongoing ("today")
    tools: string[]            // shown in the popup's toolkit row
    stack: string[]            // merged into the same toolkit row
    link?: { label: string; url: string }   
}

export const projects: Project[] = [
    {
        id: 'ventory-go',
        title: 'VentoryGo',
        summary: 'Self-hosted invoicing tool with a live-preview editor.',
        type: 'Web Application',
        image: ventoryGoCardImg,
        imageAlt: 'VentoryGo invoice editor with a live preview of the invoice',
        detailImage: ventoryGoDetailImg,
        problem:
            'Freelancers and small companies need simple invoicing without handing their data to a hosted service.',
        approach:
            'I designed the product in Figma and built the React frontend. A teammate builds the Go backend, and I review their code.',
        result:
            'A self-hosted invoicing tool, shipped as a Docker container. A form for details, payment method, currency and line items sits next to a live preview of the invoice.',
        role: ['Design', 'Frontend Development', 'Code Review'],
        teams: [{ label: 'Mirac61 (Go backend)', url: 'https://github.com/Mirac61/' }],
        start: '2026-07',
        tools: ['Figma', 'Zed'],
        stack: ['React', 'TypeScript', 'Go', 'PostgreSQL', 'Docker'],
        link: { label: 'View on GitHub', url: 'https://github.com/Mirac61/VentoryGo' },
    },
    {
        id: 'activity-tracker',
        title: 'ActivityTracker',
        summary: 'An Android app for tracking daily activities with streaks and reminders.',
        type: 'Android Application',
        image: activityTrackerCardImg,
        imageAlt: 'ActivityTracker progress screen with a streak and activity charts',
        detailImage: activityTrackerDetailImg,
        problem:
            'Healthy habits are easy to drop when nothing shows your progress.',
        approach:
            'In a team of five, I designed the whole app and built much of its frontend, adjusting the backend when a UI change needed it. I also reviewed teammates’ code.',
        result:
            'An Android app where every daily entry builds a streak, with progress charts and push notifications for milestones and missed days. I presented it to our supervisor at pep.digital, who assessed it.',

        role: ['Design', 'Frontend Development', 'Code Review'],
        teams: [
            { label: 'pep.digital GmbH', url: 'https://pep-digital.de/' },
            { label: 'University project' },
            { label: '5 students' },
            { label: '1 supervisor' },
        ],
        start: '2026-03',
        end: '2026-06',
        tools: ['Figma', 'Android Studio', 'IntelliJ IDEA'],
        stack: ['Kotlin', 'Java', 'PostgreSQL', 'Docker', 'Keycloak'],
        link: { label: 'View on GitHub', url: 'https://github.com/shandao256/Activity_Tracker' },
    },
    {
        id: 'aircraft-viewer',
        title: 'AircraftViewer',
        summary: 'Desktop app that plots aircraft positions on a map.',
        type: 'Desktop Application',
        image: aircraftViewerCardImg,
        imageAlt: 'AircraftViewer map with aircraft positions and a table of flights',
        detailImage: aircraftViewerDetailImg,
        problem:
            'Aircraft position data is hard to read as raw numbers.',
        approach:
            'I designed and built it on my own in C# and .NET.',
        result:
            'A desktop app that plots aircraft on a map and lists them in a table with ICAO code, callsign, speed, track and coordinates. Selecting one opens its details in a side panel.',
        role: ['Design', 'Fullstack Development'],
        teams: [{ label: 'Solo project' }],
        start: '2026-02',
        tools: [],
        stack: ['C#'],
        link: { label: 'View on GitHub', url: 'https://github.com/shandao256/AircraftViewer' },
    },
]

const monthFormat = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
})

function formatMonth(yearMonth: string): string {
    return monthFormat.format(new Date(`${yearMonth}-01T00:00:00Z`))
}

export function formatPeriod(project: Pick<Project, 'start' | 'end'>): string {
    return `${formatMonth(project.start)} – ${project.end ? formatMonth(project.end) : 'today'}`
}

const monthOnlyFormat = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' })

export function formatPeriodShort(project: Pick<Project, 'start' | 'end'>): string {
    if (!project.end) return formatPeriod(project)

    const sameYear = project.start.slice(0, 4) === project.end.slice(0, 4)
    if (!sameYear) return formatPeriod(project)

    const startMonth = monthOnlyFormat.format(new Date(`${project.start}-01T00:00:00Z`))
    return `${startMonth} – ${formatMonth(project.end)}`
}
