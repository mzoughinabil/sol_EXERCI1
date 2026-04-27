import { useEffect, useRef } from "react";
import katex from "katex";

interface Props {
  math: string;
  display?: boolean;
  className?: string;
}

export default function MathBlock({ math, display = false, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(math, ref.current, {
          displayMode: display,
          throwOnError: false,
          trust: true,
          strict: false,
        });
      } catch (e) {
        if (ref.current) ref.current.textContent = math;
      }
    }
  }, [math, display]);

  return <span ref={ref} className={className} />;
}

/** Render inline HTML that may contain \(...\) or $$...$$ or \[...\] LaTeX */
export function RichText({ text, className = "" }: { text: string; className?: string }) {
  // Split text by LaTeX delimiters and render each part
  const parts = parseRichText(text);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.type === "text" ? (
          <span key={i}>{part.value}</span>
        ) : (
          <MathBlock key={i} math={part.value} display={part.display} />
        )
      )}
    </span>
  );
}

type Part = { type: "text"; value: string } | { type: "math"; value: string; display: boolean };

function parseRichText(text: string): Part[] {
  const parts: Part[] = [];
  // Matches: \[...\], $$...$$, \(...\)
  const regex = /\\\[(.+?)\\\]|\$\$(.+?)\$\$|\\\((.+?)\\\)/gs;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    const mathContent = match[1] ?? match[2] ?? match[3];
    const isDisplay = !!(match[1] || match[2]);
    parts.push({ type: "math", value: mathContent, display: isDisplay });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  return parts;
}
