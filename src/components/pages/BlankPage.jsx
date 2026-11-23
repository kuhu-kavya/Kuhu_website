// An empty sheet of paper. Projects will go on these pages later.
export default function BlankPage({ number }) {
  return (
    <div className="page paper">
      {number && <span className="page__number">{number}</span>}
    </div>
  )
}
