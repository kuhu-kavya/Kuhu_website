// ✏️ All the words on the homepage live here.
// Change the text between the quotes, save, and the site updates.

export const content = {
  firstName: 'Kuhu',
  fullName: 'Kuhu Kavya',
  tagline: 'Portfolio',

  // The greeting at the top of the homepage: "Hi, [visitor's name]" + a script line.
  greeting: 'Hi,',
  greetingLine: 'welcome to my portfolio',
  namePlaceholder: 'your name',

  // The illustration in public/images/. To swap it, replace that file
  // (keep the same name) or change the name here.
  face: 'kuhu-face.png',
  faceAlt: 'Pink illustration of Kuhu’s face',

  // The pink cards at the top of every page.
  nav: [
    { label: 'About', section: 'about' },
    { label: 'Projects', section: 'projects' },
    { label: 'Contact', section: 'contact' },
  ],

  // The Contact section at the end of the homepage.
  // ✏️ Placeholders: replace `value` with your details. Add `href` to make one a
  // link, e.g. href: 'mailto:you@example.com' or 'https://instagram.com/you'.
  contactHeading: 'Contact',
  contactLine: 'let’s work together',
  contact: [
    { label: 'Email', value: '✏️ your email here' },
    { label: 'Instagram', value: '✏️ @yourhandle' },
    { label: 'LinkedIn', value: '✏️ your LinkedIn link' },
    { label: 'Behance', value: '✏️ your Behance link' },
  ],

  aboutHeading: 'About me',

  // Each item is one paragraph; they fade in one after another as you scroll.
  about: [
    'Hi, I am Kuhu, I am a multidisciplinary designer with a strong interest in creating thoughtful, engaging, and purposeful visual experiences. I enjoy translating ideas into work that is both visually compelling and functional.',
    'I believe that good design goes beyond aesthetics, it communicates, solves problems, and creates meaningful connections.',
    'I’m always learning, refining my craft, and looking for opportunities to collaborate on projects that challenge me to grow as a designer.',
  ],
}
