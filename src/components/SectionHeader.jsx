// The one heading pattern used on every page:
//   01 —— Label
//   Title as a short sentence.
//   Optional description.
// Use as="h1" for the first header on a page, h2 for the sections after it.
export default function SectionHeader({ index, label, title, description, as: Heading = "h2", id, className = "" }) {
  return (
    <header className={`section-header ${className}`.trim()}>
      <p className="section-badge">
        <span className="section-badge-num">{index}</span>
        {label}
      </p>
      <Heading id={id} className={`section-title${Heading === "h1" ? " is-page-title" : ""}`}>
        {title}
      </Heading>
      {description && <p className="section-description">{description}</p>}
    </header>
  );
}
