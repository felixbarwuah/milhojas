import type { Level } from '../data/vocab';

interface Props {
  value: Level | 'all';
  onChange: (level: Level | 'all') => void;
}

const levels: (Level | 'all')[] = ['all', 'A1', 'A2', 'B1'];

export default function LevelFilter({ value, onChange }: Props) {
  return (
    <div className="config-section">
      <h3 className="config-title">Niveau</h3>
      <div className="direction-toggle">
        {levels.map(l => (
          <button
            key={l}
            className={`toggle-btn ${value === l ? 'active' : ''}`}
            onClick={() => onChange(l)}
          >
            {l === 'all' ? 'Alle' : l}
          </button>
        ))}
      </div>
    </div>
  );
}
