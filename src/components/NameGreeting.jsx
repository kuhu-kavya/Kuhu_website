import { useEffect, useState } from 'react'
import { content } from '../content.js'

// The visitor's name is kept in their own browser (never sent anywhere),
// so the greeting remembers them next time.
const STORAGE_KEY = 'kuhu-visitor-name'
const MAX_LENGTH = 16

function loadName() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) || ''
  } catch {
    return '' // storage blocked (e.g. private browsing): just start empty
  }
}

function saveName(name) {
  try {
    if (name) window.localStorage.setItem(STORAGE_KEY, name)
    else window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // storage blocked: the greeting still works, it just won't be remembered
  }
}

// "HI, [type your name]" with "welcome to my portfolio" underneath.
export default function NameGreeting() {
  const [name, setName] = useState(loadName)

  useEffect(() => saveName(name.trim()), [name])

  // The big line shrinks for long names so it always fits on one line.
  const shown = name || content.namePlaceholder
  const chars = content.greeting.length + 1 + Math.max(shown.length, 4)

  return (
    <div className="greet">
      <p className="greet__line" style={{ '--chars': chars }}>
        <span className="greet__hi">{content.greeting}</span>{' '}
        <label className="greet__field" data-value={shown}>
          <span className="visually-hidden">Your name</span>
          <input
            type="text"
            value={name}
            placeholder={content.namePlaceholder}
            maxLength={MAX_LENGTH}
            size={1}
            autoComplete="given-name"
            autoCapitalize="words"
            spellCheck="false"
            enterKeyHint="done"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur()
            }}
          />
        </label>
      </p>
      <p className="greet__welcome">{content.greetingLine}</p>
    </div>
  )
}
