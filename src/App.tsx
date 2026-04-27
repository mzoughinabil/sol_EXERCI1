import { useState, useEffect, useCallback } from "react";
import { slides } from "./slides";
import SlideRenderer from "./SlideRenderer";
import "./presentation.css";

export default function App() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const total = slides.length;

  const goTo = useCallback(
    (index: number, dir: "next" | "prev") => {
      if (animating || index < 0 || index >= total) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 280);
    },
    [animating, total]
  );

  const next = useCallback(() => goTo(current + 1, "next"), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, "prev"), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slide = slides[current];

  return (
    <div className="presentation-root">
      {/* ── Stage ── */}
      <div className="stage">
        <div
          className={`slide-anim ${animating ? (direction === "next" ? "exit-left" : "exit-right") : "enter"}`}
        >
          <SlideRenderer slide={slide} />
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="controls">
        <button
          className="ctrl-btn"
          onClick={prev}
          disabled={current === 0}
          title="Slide précédente (←)"
        >
          ‹
        </button>

        {/* Progress dots */}
        <div className="dots">
          {slides.map((s, i) => (
            <button
              key={i}
              className={`dot ${i === current ? "dot-active" : ""}`}
              style={i === current ? { background: slide.sectionColor } : {}}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
              title={s.section}
            />
          ))}
        </div>

        <button
          className="ctrl-btn"
          onClick={next}
          disabled={current === total - 1}
          title="Slide suivante (→)"
        >
          ›
        </button>
      </div>

      {/* ── Keyboard hint ── */}
      <div className="kbd-hint">
        Utilisez ← → pour naviguer &nbsp;|&nbsp; {current + 1} / {total}
      </div>
    </div>
  );
}
