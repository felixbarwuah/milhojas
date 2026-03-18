import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          maxWidth: 600, margin: '40px auto', padding: '24px',
          textAlign: 'center', color: '#4A4540',
        }}>
          <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
            Etwas ist schiefgelaufen
          </p>
          <p style={{ fontSize: 14, color: '#6B6560', marginBottom: 16 }}>
            {this.state.error?.message || 'Unbekannter Fehler'}
          </p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
            style={{
              padding: '10px 20px', fontSize: 13, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              border: '1px solid rgba(0,0,0,0.15)', borderRadius: 3,
              background: 'transparent', cursor: 'pointer',
            }}
          >
            Neu laden
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
