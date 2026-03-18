import { type ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

export default function SafeQuiz({ children }: { children: ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
