// ✏️ The projects shown on the "Projects / selected work" carousel.
//
// Cover images live in public/images/projects/<folder>/. To use a better version
// of an image, drop your file in with the same name (or change the name here).
//
// Each project:
//   slug      the page address: #/projects/<slug>
//   number    shown big on the card
//   title     wide caps title          script   handwritten line under it
//   category  small line on the card   cover    card image (+ coverAlt description)
//
// A project with a `gallery` gets a designed page; without one its page is blank.
//   did       "What I did" text         learnt   "What I learnt" text
//   gallery   rounded panels of images, top to bottom. Each panel lists its
//             images; `columns` puts several side by side (`phoneColumns` on phones).
//             `tall: true` shows a single tall image smaller, centred in its panel.

export const projects = [
  {
    slug: 'souldout',
    number: '01',
    title: 'Agency Work',
    script: 'Souldout',
    category: 'Brand decks · Social · Print',
    cover: 'souldout/social-2.jpg',
    coverAlt: 'Mooi lip products with a straw bag on a purple background',
    did: '✏️ Placeholder — a few lines about what you did on this project. Replace this text in src/projects.js.',
    learnt: '✏️ Placeholder — a few lines about what you learnt from it. Replace this text in src/projects.js.',
    gallery: [
      { images: [{ src: 'souldout/oppo-journey.jpg', alt: 'Oppo Club House visitor journey board' }] },
      { images: [{ src: 'souldout/oppo-zones.jpg', alt: 'Oppo Club House experience zones board' }] },
      {
        columns: 5,
        phoneColumns: 2,
        images: [
          { src: 'souldout/social-1.jpg', alt: 'Mooi lipstick creative, “The Spell”' },
          { src: 'souldout/social-2.jpg', alt: 'Mooi lip products with a straw bag' },
          { src: 'souldout/social-3.jpg', alt: 'Mooi “Sailing smoothly through rainy season” creative' },
          { src: 'souldout/social-4.jpg', alt: 'Namah “Thoda maska maarke” creative' },
          { src: 'souldout/social-5.jpg', alt: 'Namah medu vada creative' },
        ],
      },
      {
        columns: 2,
        phoneColumns: 1,
        images: [
          { src: 'souldout/shubharambh-poster.jpg', alt: 'Shubharambh 2026 newspaper-style poster' },
          { src: 'souldout/shubharambh-box.jpg', alt: 'Purple and yellow Shubharambh gift box' },
        ],
      },
      { images: [{ src: 'souldout/render-booth.jpg', alt: 'AI render of a gold and black bar booth' }] },
      { images: [{ src: 'souldout/render-aerial.jpg', alt: 'AI render: aerial view of the Oppo Club House zone' }] },
    ],
  },
  {
    slug: 'indicub',
    number: '02',
    title: 'Digital Campaign',
    script: 'IndiCub',
    category: 'Launch campaign',
    cover: 'indicub/launch-sale.jpg',
    coverAlt: 'IndiCub “Launch SALE, flat 20% off” post',
    did: '✏️ Placeholder — a few lines about what you did on this project. Replace this text in src/projects.js.',
    learnt: '✏️ Placeholder — a few lines about what you learnt from it. Replace this text in src/projects.js.',
    gallery: [
      { tall: true, images: [{ src: 'indicub/launch-sale.jpg', alt: 'IndiCub “Launch SALE, flat 20% off” Instagram post' }] },
      { images: [{ src: 'indicub/coming-soon.jpg', alt: 'IndiCub “Something new to grow into, coming soon” hero banner' }] },
    ],
  },
  {
    slug: 'dot-and-key',
    number: '03',
    title: 'Brand Redesign',
    script: 'Dot & Key',
    category: 'Self-initiated · Visual identity · Packaging',
    cover: 'dot-and-key/moisturiser.jpg',
    coverAlt: 'A hand holding a redesigned Dot & Key moisturiser tube',
    did: '✏️ Placeholder — a few lines about what you did on this project. Replace this text in src/projects.js.',
    learnt: '✏️ Placeholder — a few lines about what you learnt from it. Replace this text in src/projects.js.',
    gallery: [
      { tall: true, images: [{ src: 'dot-and-key/moisturiser.jpg', alt: 'Redesigned Dot & Key Barrier Repair Moisturiser' }] },
      { images: [{ src: 'dot-and-key/identity.jpg', alt: 'Dot & Key identity sheet: logo, favicon, colour palette, typography and brand application' }] },
    ],
  },
  {
    slug: 'stickers',
    number: '04',
    title: 'Illustrations',
    script: 'sticker design',
    category: 'Kuhu × The Secondhand Bookstore',
    cover: 'stickers/sticker-sheet.jpg',
    coverAlt: 'Sticker sheet with bookish characters and stars',
    did: '✏️ Placeholder — a few lines about what you did on this project. Replace this text in src/projects.js.',
    learnt: '✏️ Placeholder — a few lines about what you learnt from it. Replace this text in src/projects.js.',
    gallery: [
      { tall: true, images: [{ src: 'stickers/sticker-sheet.jpg', alt: 'Kuhu × The Secondhand Bookstore sticker sheet' }] },
    ],
  },
  {
    slug: 'interior',
    number: '05',
    title: 'Residential Interior',
    script: 'Design',
    category: 'Space planning · Site execution',
    cover: 'interior/moodboard-1.jpg',
    coverAlt: 'Terracotta-toned interior moodboard',
    did: '✏️ Placeholder — a few lines about what you did on this project. Replace this text in src/projects.js.',
    learnt: '✏️ Placeholder — a few lines about what you learnt from it. Replace this text in src/projects.js.',
    gallery: [
      { images: [{ src: 'interior/moodboard-1.jpg', alt: 'Moodboard of terracotta and earthy interiors' }] },
      { images: [{ src: 'interior/moodboard-2.jpg', alt: 'Second moodboard of arches, textures and living spaces' }] },
      { images: [{ src: 'interior/technical-drawing.jpg', alt: 'Technical drawing of wardrobes for the master bedroom and middle room' }] },
      { images: [{ src: 'interior/ai-visualisation.jpg', alt: 'AI visualisations of the bedroom and bathroom' }] },
      {
        columns: 2,
        phoneColumns: 1,
        images: [
          { src: 'interior/site-1.jpg', alt: 'Site photo: room stripped back during construction' },
          { src: 'interior/site-2.jpg', alt: 'Site photo: bathroom during demolition' },
        ],
      },
    ],
  },
]

export const projectImage = (src) => `${import.meta.env.BASE_URL}images/projects/${src}`
