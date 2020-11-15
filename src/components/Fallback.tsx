import React, { Suspense, PropsWithChildren } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { ErrorPage } from './ErrorPage'
import { Loading } from './Loading'

export function Fallback({
  children,
  silent,
}: PropsWithChildren<{ silent?: boolean }>) {
  return (
    <ErrorBoundary
      fallback={!silent && <ErrorPage title="ไม่สามารถโหลดข้อมูลได้" />}
    >
      <Suspense fallback={!silent && <Loading />}>{children}</Suspense>
    </ErrorBoundary>
  )
}
