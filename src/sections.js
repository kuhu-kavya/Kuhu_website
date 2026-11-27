// Jumping to a part of the homepage: "#about", "#projects" or "#contact".

export const SECTION_HASHES = ['#about', '#projects', '#contact']

const pageTop = (el) => el.getBoundingClientRect().top + window.scrollY

export function scrollToSection(hash) {
  if (hash === '#about') {
    // The About text appears while scrolling through the first section,
    // so go to the point where it's fully shown.
    const hero = document.querySelector('.hero')
    if (!hero) return
    const travel = hero.offsetHeight - window.innerHeight
    window.scrollTo(0, pageTop(hero) + Math.max(0, travel) * 0.9)
  } else if (hash === '#projects') {
    const work = document.getElementById('work')
    if (work) window.scrollTo(0, pageTop(work))
  } else if (hash === '#contact') {
    const contact = document.getElementById('contact')
    if (contact) window.scrollTo(0, pageTop(contact))
  }
}
