import React, { Suspense, PropsWithChildren } from 'react'
import { ErrorBoundary } from './ErrorBoundary'

export function Fallback({ children }: PropsWithChildren<{}>) {
  return (
    <ErrorBoundary fallback="Error loading data.">
      <Suspense fallback="Loading...">{children}</Suspense>
    </ErrorBoundary>
  )
}
