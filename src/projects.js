// ✏️ The projects shown on the "Projects / selected work" carousel.
//
// Cover images live in public/images/projects/<folder>/. To use a better version
// of an image, drop your file in with the same name (or change the name here).
//
// Each project:
//   slug      a short id (will be used for the project pages later)
//   number    shown big on the card
//   title     wide caps title          script   handwritten line under it
//   category  small line on the card   cover    card image (+ coverAlt description)

export const projects = [
  {
    slug: 'souldout',
    number: '01',
    title: 'Agency Work',
    script: 'Souldout',
    category: 'Brand decks · Social · Print',
    cover: 'souldout/social-2.jpg',
    coverAlt: 'Mooi lip products with a straw bag on a purple background',
  },
  {
    slug: 'indicub',
    number: '02',
    title: 'Digital Campaign',
    script: 'IndiCub',
    category: 'Launch campaign',
    cover: 'indicub/launch-sale.jpg',
    coverAlt: 'IndiCub “Launch SALE, flat 20% off” post',
  },
  {
    slug: 'dot-and-key',
    number: '03',
    title: 'Brand Redesign',
    script: 'Dot & Key',
    category: 'Self-initiated · Visual identity · Packaging',
    cover: 'dot-and-key/moisturiser.jpg',
    coverAlt: 'A hand holding a redesigned Dot & Key moisturiser tube',
  },
  {
    slug: 'stickers',
    number: '04',
    title: 'Illustrations',
    script: 'sticker design',
    category: 'Kuhu × The Secondhand Bookstore',
    cover: 'stickers/sticker-sheet.jpg',
    coverAlt: 'Sticker sheet with bookish characters and stars',
  },
  {
    slug: 'interior',
    number: '05',
    title: 'Residential Interior',
    script: 'Design',
    category: 'Space planning · Site execution',
    cover: 'interior/moodboard-1.jpg',
    coverAlt: 'Terracotta-toned interior moodboard',
  },
]

export const projectImage = (src) => `${import.meta.env.BASE_URL}images/projects/${src}`
