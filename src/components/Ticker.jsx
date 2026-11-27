// The vertical "KUHU KAVYA - PORTFOLIO -" strip from the PDF, slowly scrolling.
export default function Ticker({ text, className = '', style }) {
  const run = `${text} - `.repeat(8)
  return (
    <div className={`ticker ${className}`} style={style} aria-hidden="true">
      <div className="ticker__track">
        <span>{run}</span>
        <span>{run}</span>
      </div>
    </div>
  )
}
