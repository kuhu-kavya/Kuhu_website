import { content } from '../content.js'
import Sparkle from './Sparkle.jsx'

// The closing section of the homepage. Details live in content.js.
export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="band" aria-hidden="true">
        <span>{`${content.fullName} - ${content.tagline} - `.repeat(10)}</span>
      </div>

      <div className="contact__inner">
        <h2>
          <span className="contact__wide">{content.contactHeading}</span>
          <span className="contact__script">{content.contactLine}</span>
        </h2>
        <Sparkle className="contact__sparkle" />

        <dl className="contact__list">
          {content.contact.map((item) => (
            <div key={item.label} className="contact__item">
              <dt>{item.label}</dt>
              <dd>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
