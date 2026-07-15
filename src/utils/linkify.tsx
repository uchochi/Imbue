import type { ReactNode } from 'react';

const URL_RE = /https?:\/\/[^\s<>"')]+|www\.[^\s<>"')]+/;
const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

export function linkify(text: string): ReactNode[] {
  const combined = new RegExp(`(${URL_RE.source})|(${EMAIL_RE.source})`, 'g');
  const parts = text.split(combined);
  const result: ReactNode[] = [];

  parts.forEach((part, i) => {
    if (!part) return;
    if (URL_RE.test(part)) {
      const href = part.startsWith('http') ? part : `https://${part}`;
      result.push(
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          {part}
        </a>,
      );
    } else if (EMAIL_RE.test(part)) {
      result.push(
        <a key={i} href={`mailto:${part}`} className="text-primary hover:underline">
          {part}
        </a>,
      );
    } else {
      result.push(part);
    }
  });

  return result;
}
