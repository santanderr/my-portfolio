import './Head.css'
import { aboutData } from '../datasets/dataAbout.ts'
import Button from './unified/Button.tsx'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'


const contacts = [
    { label: aboutData.email, href: `mailto:${aboutData.email}`, external: false },
    ...aboutData.links.map((link) => ({ label: link.label, href: link.url, external: true })),
]


function Head() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
          gsap.from('.head > *', {
              opacity: 0,
              y: 24,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.08,
          })
      })
  }, { scope: ref })

  
    return (
      <header ref={ref} className="head container">
        <h1 className="head__title">{aboutData.name} — <span className="head__role">{aboutData.role} based in {aboutData.location}</span>
        </h1>
            <p className="head__tagline">{aboutData.tagline}</p>

            <div className="head__about">
                <p>
                  I design the frontend and build in TypeScript, with Java, Kotlin and Spring on the backend.
                  Studying at <a href="https://www.hs-esslingen.de/" target="_blank"><span className="highlight__education">Esslingen University of Applied Sciences</span></a>,
                  graduating February 2028.
                </p>
          <br />
          <p>
            I like software that makes everyday things simpler.
            Outside of code I care about public transport and renewable energy, and I’ll gladly talk about cars.
          </p>
        </div>

        <ul className="head__contacts">
            {contacts.map((contact) => (
              <li key={contact.href}>
                  <Button href={contact.href} variant="text">{contact.label}</Button>
              </li>
            ))}
        </ul>
        </header>
    )
}

export default Head