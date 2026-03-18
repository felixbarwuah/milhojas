import { type ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

/**
 * Wraps any React island with an ErrorBoundary.
 * Used in Astro pages: <AppWrapper client:load><MyComponent /></AppWrapper>
 */
export default function AppWrapper({ children }: { children: ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
