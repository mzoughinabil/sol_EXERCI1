import { Slide, SlideBlock, EqRow, BulletItem, Badge } from "./slides";
import MathBlock, { RichText } from "./MathBlock";

interface Props {
  slide: Slide;
}

export default function SlideRenderer({ slide }: Props) {
  return (
    <div className="slide-wrapper">
      {/* Header strip */}
      <div className="slide-header" style={{ background: slide.sectionColor }}>
        <span className="slide-section">{slide.section}</span>
      </div>

      {/* Title */}
      <div className="slide-title-bar" style={{ borderColor: slide.sectionColor }}>
        <h1 className="slide-title">
          <RichText text={slide.title} />
        </h1>
      </div>

      {/* Content */}
      <div className="slide-content">
        {slide.content.map((block, i) => (
          <BlockRenderer key={i} block={block} accentColor={slide.sectionColor} />
        ))}
      </div>

      {/* Footer */}
      <div className="slide-footer" style={{ borderColor: slide.sectionColor }}>
        <span style={{ color: slide.sectionColor, fontWeight: 700 }}>Suites Numériques – Exercice 1</span>
        <span className="slide-number">Slide {slide.id + 1} / 11</span>
      </div>
    </div>
  );
}

function BlockRenderer({ block, accentColor }: { block: SlideBlock; accentColor: string }) {
  switch (block.type) {
    case "text":
      return (
        <p className="block-text">
          <RichText text={block.value} />
        </p>
      );

    case "math":
      return (
        <div className={block.display ? "block-math-display" : "block-math-inline"}>
          <MathBlock math={block.value} display={block.display ?? false} />
        </div>
      );

    case "divider":
      return <div className="block-divider" style={{ borderColor: accentColor + "40" }} />;

    case "alert":
      return (
        <div className="block-alert">
          <span className="alert-icon">{block.icon}</span>
          <span className="alert-text">
            <RichText text={block.value} />
          </span>
        </div>
      );

    case "highlight":
      return (
        <div
          className="block-highlight"
          style={{
            borderColor: block.color,
            background: block.color + "12",
          }}
        >
          {block.items.map((item, i) => (
            <p key={i} className="highlight-item" style={{ color: block.color }}>
              <RichText text={item} />
            </p>
          ))}
        </div>
      );

    case "equation-row":
      return <EqRowBlock rows={block.items} accentColor={accentColor} />;

    case "step":
      return (
        <div className="block-step">
          <div className="step-label" style={{ background: accentColor }}>
            {block.label}
          </div>
          <div className="step-body">
            {block.items.map((item, i) => (
              <div key={i} className="step-item">
                {item.label && <span className="step-item-label">{item.label}</span>}
                {item.isMath ? (
                  <MathBlock math={item.content} display />
                ) : (
                  <span>{item.content}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case "conclusion":
      return (
        <div className="block-conclusion" style={{ borderColor: accentColor, background: accentColor + "10" }}>
          <span className="conclusion-icon">{block.icon}</span>
          <span className="conclusion-text" style={{ color: accentColor }}>
            <RichText text={block.value} />
          </span>
        </div>
      );

    case "bullet":
      return <BulletBlock items={(block as { type: "bullet"; items: BulletItem[] }).items} />;

    case "badge-row":
      return <BadgeRowBlock items={(block as { type: "badge-row"; items: Badge[] }).items} />;

    case "columns":
      return (
        <div className="block-columns">
          <div className="col-left">
            {block.left.map((b, i) => (
              <BlockRenderer key={i} block={b} accentColor={accentColor} />
            ))}
          </div>
          <div className="col-right">
            {block.right.map((b, i) => (
              <BlockRenderer key={i} block={b} accentColor={accentColor} />
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

function EqRowBlock({ rows, accentColor }: { rows: EqRow[]; accentColor: string }) {
  return (
    <div className="eq-table">
      {rows.map((row, i) => (
        <div key={i} className="eq-row" style={{ borderColor: accentColor + "25" }}>
          {row.label && (
            <div className="eq-label">
              <RichText text={row.label} />
            </div>
          )}
          <div className="eq-body">
            <MathBlock math={row.eq} display />
          </div>
          {row.comment && (
            <div className="eq-comment">
              <RichText text={row.comment} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function BulletBlock({ items }: { items: BulletItem[] }) {
  return (
    <ul className="bullet-list">
      {items.map((item, i) => (
        <li key={i} className="bullet-item">
          {item.icon && <span className="bullet-icon">{item.icon}</span>}
          <span className="bullet-text">
            <RichText text={item.text} />
            {item.sub && (
              <span className="bullet-sub">
                <RichText text={item.sub} />
              </span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function BadgeRowBlock({ items }: { items: Badge[] }) {
  return (
    <div className="badge-row">
      {items.map((badge, i) => (
        <div
          key={i}
          className="badge"
          style={{ background: badge.color + "20", borderColor: badge.color, color: badge.color }}
        >
          {badge.isMath ? <RichText text={badge.text} /> : badge.text}
        </div>
      ))}
    </div>
  );
}
