import { speak, isTTSSupported } from '../data/speech';

interface Props {
  text: string;
  lang?: string;
  className?: string;
}

export default function SpeakButton({ text, lang = 'es-ES', className = '' }: Props) {
  if (!isTTSSupported()) return null;

  return (
    <button
      className={`speak-btn ${className}`}
      onClick={(e) => { e.stopPropagation(); speak(text, lang); }}
      aria-label="Aussprache anhören"
      type="button"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      </svg>
    </button>
  );
}
