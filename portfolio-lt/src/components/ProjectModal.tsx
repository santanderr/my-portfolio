import { useEffect, useRef, useState, useCallback } from 'react'
import { XIcon, ArrowUpRightIcon } from '@phosphor-icons/react'
import { formatPeriod, type Project } from '../datasets/projects.ts'
import Button from './unified/Button.tsx'
import figmaLogo from '../assets/icons/figma.svg'
import zedLogo from '../assets/icons/zed.svg'
import androidStudioLogo from '../assets/icons/android-studio.svg'
import intellijIdeaLogo from '../assets/icons/intellij-idea.svg'
import reactLogo from '../assets/icons/react.svg'
import typescriptLogo from '../assets/icons/typescript.svg'
import goLogo from '../assets/icons/go.svg'
import postgresqlLogo from '../assets/icons/postgresql.svg'
import dockerLogo from '../assets/icons/docker.svg'
import kotlinLogo from '../assets/icons/kotlin.svg'
import javaLogo from '../assets/icons/java.svg'
import keycloakLogo from '../assets/icons/keycloak.svg'
import csharpLogo from '../assets/icons/csharp.svg'
import dotnetLogo from '../assets/icons/dotnet.svg'
import './ProjectModal.css'

interface Props {
    project: Project | null
    onClose: () => void
}

const toolIcons: Record<string, string> = {
    Figma: figmaLogo,
    Zed: zedLogo,
    'Android Studio': androidStudioLogo,
    'IntelliJ IDEA': intellijIdeaLogo,
    React: reactLogo,
    TypeScript: typescriptLogo,
    Go: goLogo,
    PostgreSQL: postgresqlLogo,
    Docker: dockerLogo,
    Kotlin: kotlinLogo,
    Java: javaLogo,
    Keycloak: keycloakLogo,
    'C#': csharpLogo,
    '.NET': dotnetLogo,
}

function ProjectModal({ project: openProject, onClose }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    const [project, setProject] = useState(openProject)
    if (openProject && openProject !== project) setProject(openProject)

    const toolkit = project ? [...new Set([...project.tools, ...project.stack])] : []

    useEffect(() => {
        const dialog = dialogRef.current!
        if (openProject && !dialog.open) dialog.showModal()
        if (openProject) dialog.scrollTop = 0
    }, [openProject])

    const requestClose = useCallback(() => {
        const dialog = dialogRef.current
        if (!dialog?.open || dialog.classList.contains('is-closing')) return

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            dialog.close()
            return
        }

        dialog.classList.add('is-closing')

        const finish = () => {
            dialog.removeEventListener('transitionend', onEnd)
            clearTimeout(fallback)
            dialog.classList.remove('is-closing')
            dialog.close()
        }
        const onEnd = (e: TransitionEvent) => {
            if (e.target === dialog && e.propertyName === 'opacity') finish()
        }
        const fallback = setTimeout(finish, 500)
        dialog.addEventListener('transitionend', onEnd)
    }, [])

    return (
        <dialog
            ref={dialogRef}
            className="project-modal"
            onClose={onClose}
            onCancel={(e) => {
                e.preventDefault()
                requestClose()
            }}
            onClick={(e) => {
                if (e.target === dialogRef.current) requestClose()
            }}
            aria-labelledby="project-modal-title"
        >
            {project && (
                <div className="project-modal__inner">
                    <div className="project-modal__bar">
                        <Button
                            variant="icon"
                            className="project-modal__close"
                            onClick={requestClose}
                            aria-label="Close"
                            icon={<XIcon size={24} />}
                        />
                    </div>

                    <article className="project-modal__article">
                        <header className="project-modal__header">
                            <p className="project-modal__eyebrow">
                              <span aria-hidden="true">·</span> {formatPeriod(project)}
                            </p>
                            <h2 id="project-modal-title" className="project-modal__title">
                                {project.title}
                            </h2>
                            <p className="project-modal__summary">{project.summary}</p>
                        </header>

                        <figure className="project-modal__cover">
                            <img
                                className="project-modal__media"
                                src={project.detailImage ?? project.image}
                                alt={project.imageAlt}
                            />
                        </figure>

                        <div className="project-modal__prose">
                            <p>{project.problem}</p>
                            <p>{project.approach}</p>
                            <h3>Result</h3>
                            <p>{project.result}</p>
                        </div>

                        <section className="project-modal__facts" aria-label="Project details">
                            <div className="project-modal__fact">
                                <h3>Role</h3>
                                <p className="project-modal__muted">{project.role.join(', ')}</p>
                            </div>

                            <div className="project-modal__fact">
                                <h3>Teams</h3>
                                <InlineList
                                    items={project.teams.map((team) => ({
                                        label: team.label,
                                        url: team.url,
                                    }))}
                                />
                            </div>

                            {toolkit.length > 0 && (
                                <div className="project-modal__fact">
                                    <h3>Toolkit</h3>
                                    <ul className="toolkit">
                                        {toolkit.map((tool) => (
                                            <li key={tool} className="toolkit__item">
                                                <span className="toolkit__icon">
                                                    {toolIcons[tool] ? (
                                                        <img src={toolIcons[tool]} alt="" width="28" height="28" />
                                                    ) : (
                                                        <span className="toolkit__monogram" aria-hidden="true">
                                                            {tool.charAt(0)}
                                                        </span>
                                                    )}
                                                </span>
                                                <span className="toolkit__name">{tool}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>

                        {project.link?.url && (
                            <Button
                                href={project.link.url}
                                icon={<ArrowUpRightIcon size={24} aria-hidden="true" />}
                                className="project-modal__cta"
                            >
                                {project.link.label}
                            </Button>
                        )}
                    </article>
                </div>
            )}
        </dialog>
    )
}

function InlineList({ items }: { items: { label: string; url?: string }[] }) {
    return (
        <ul className="project-modal__inline-list">
            {items.map((item, i) => (
                <li key={`${item.label}-${i}`}>
                    {item.url ? (
                        <a href={item.url} target="_blank" rel="noreferrer">
                            {item.label}
                        </a>
                    ) : (
                        item.label
                    )}
                </li>
            ))}
        </ul>
    )
}

export default ProjectModal
