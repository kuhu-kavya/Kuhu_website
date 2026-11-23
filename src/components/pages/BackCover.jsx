import { profile } from '../../content.js'

export default function BackCover() {
  return (
    <div className="page cover cover--back">
      <span className="cover__mark" aria-hidden="true">
        {profile.name.charAt(0)}
      </span>
      <p className="cover__thanks">Thanks for looking.</p>
      <span className="cover__band" aria-hidden="true" />
    </div>
  )
}
