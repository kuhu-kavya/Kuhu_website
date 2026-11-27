import { content } from '../content.js'
import { scrollToSection } from '../sections.js'
import { scrollMemory } from '../hooks/useHashRoute.js'

// The bar at the top of every page: "Kuhu Kavya" on the left (back to the top
// of the homepage) and pink cards for About / Projects / Contact.
// `overlay` lays it over the homepage's first screen instead of pushing it down.
// `back` (project pages) adds a "← Back" at the top left on phones.
export default function TopBar({ overlay = false, back = false }) {
  // Clicking a card whose address is already showing doesn't change the
  // address, so scroll there by hand.
  const jump = (hash) => (e) => {
    if (window.location.hash === hash) {
      e.preventDefault()
      scrollToSection(hash)
    }
  }

  return (
    <header className={`topbar${overlay ? ' topbar--overlay' : ''}${back ? ' topbar--back' : ''}`}>
      {back && (
        <a className="topbar__back" href="#">
          ← Back
        </a>
      )}
      <a
        className="topbar__home"
        href="#"
        onClick={(e) => {
          if (!window.location.hash) {
            e.preventDefault()
            window.scrollTo(0, 0)
          } else {
            scrollMemory.y = 0 // from a project page: open the homepage at its top
          }
        }}
      >
        {content.fullName}
      </a>
      <nav aria-label="Main">
        <ul className="topbar__cards">
          {content.nav.map((item) => (
            <li key={item.section}>
              <a className="topbar__card" href={`#${item.section}`} onClick={jump(`#${item.section}`)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
