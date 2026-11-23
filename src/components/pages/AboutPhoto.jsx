import { profile } from '../../content.js'

export default function AboutPhoto() {
  const src = profile.photo ? `${import.meta.env.BASE_URL}images/${profile.photo}` : null

  return (
    <div className="page paper about-photo">
      <figure className="about-photo__frame">
        {src ? (
          <img src={src} alt={profile.photoAlt} />
        ) : (
          <div className="about-photo__placeholder" role="img" aria-label="Photo placeholder">
            your portrait here
          </div>
        )}
        <figcaption>
          <strong>{profile.name}</strong>
          <span>{profile.title}</span>
        </figcaption>
      </figure>
      <span className="page__number">1</span>
    </div>
  )
}
