// The four-point star from the PDF portfolio.
export default function Sparkle({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true">
      <path
        d="M50 0 C51.5 40 60 48.5 100 50 C60 51.5 51.5 60 50 100 C48.5 60 40 51.5 0 50 C40 48.5 48.5 40 50 0 Z"
        fill="currentColor"
      />
    </svg>
  )
}
