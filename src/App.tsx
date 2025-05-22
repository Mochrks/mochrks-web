import React from 'react'
import { Suspense } from 'react'
import AppRoutes from '@/router/AppRoutes'
import Loading from './components/demo/Loading'
import { SmoothCursor } from './components/ui/smooth-cursor'

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AppRoutes />
      <SmoothCursor />
    </Suspense>
  )
}

export default App