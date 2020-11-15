import React, { Suspense, PropsWithChildren } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { ErrorPage } from './ErrorPage'
import { Loading } from './Loading'

export function Fallback({ children }: PropsWithChildren<{}>) {
  return (
    <ErrorBoundary fallback={<ErrorPage title="ไม่สามารถโหลดข้อมูลได้" />}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ErrorBoundary>
  )
}
