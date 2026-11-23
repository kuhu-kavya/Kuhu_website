import Book from './components/Book.jsx'
import Cover from './components/pages/Cover.jsx'
import AboutPhoto from './components/pages/AboutPhoto.jsx'
import AboutText from './components/pages/AboutText.jsx'
import BlankPage from './components/pages/BlankPage.jsx'
import BackCover from './components/pages/BackCover.jsx'
import './book.css'

// The book's pages, in reading order. On wide screens they're paired into
// spreads, so keep an even number. `phone: false` skips a page on phones.
const pages = [
  { key: 'cover', content: <Cover /> },
  { key: 'about-photo', content: <AboutPhoto /> },
  { key: 'about-text', content: <AboutText /> },
  { key: 'page-3', content: <BlankPage number={3} /> },
  { key: 'page-4', content: <BlankPage number={4} /> },
  { key: 'page-5', content: <BlankPage number={5} /> },
  { key: 'inside-back', content: <BlankPage />, phone: false },
  { key: 'back-cover', content: <BackCover /> },
]

export default function App() {
  return (
    <main>
      <Book pages={pages} />
    </main>
  )
}
