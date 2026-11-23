import { profile } from '../../content.js'

export default function AboutText() {
  return (
    <div className="page paper about-text">
      <h2 className="about-text__heading">About</h2>

      {profile.bio.map((paragraph, i) => (
        <p key={i} className="about-text__bio">
          {paragraph}
        </p>
      ))}

      <h3 className="about-text__label">Skills</h3>
      <ul className="chips">
        {profile.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <h3 className="about-text__label">Tools</h3>
      <p className="about-text__tools">{profile.tools.join(' · ')}</p>

      <h3 className="about-text__label">Say hello</h3>
      <ul className="contact">
        {profile.contact.map((c) => (
          <li key={c.label}>
            <span>{c.label}</span>
            <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              {c.text}
            </a>
          </li>
        ))}
      </ul>

      <span className="page__number">2</span>
    </div>
  )
}
