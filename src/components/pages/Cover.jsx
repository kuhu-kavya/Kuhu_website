import { profile } from '../../content.js'

export default function Cover() {
  return (
    <div className="page cover">
      <span className="cover__sticker">
        Portfolio
        <br />
        {profile.year}
      </span>
      <div className="cover__title">
        <h1 className="cover__name">{profile.name}</h1>
        <p className="cover__role">{profile.title}</p>
      </div>
      <span className="cover__band" aria-hidden="true" />
    </div>
  )
}
