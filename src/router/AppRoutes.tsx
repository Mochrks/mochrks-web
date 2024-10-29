import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy } from 'react'


const Home = lazy(() => import('@/pages/home-page'))
const Article = lazy(() => import('@/pages/article-page'))
const Photography = lazy(() => import('@/pages/photography-page'))
const Project = lazy(() => import('@/pages/project-page'))
const Design = lazy(() => import('@/pages/design-page'))
const UIUXDesign = lazy(() => import('@/pages/uiux-page'))
const NotFound = lazy(() => import('@/components/demo/NotFound'))


interface RouteConfig {
  path: string
  element: React.ReactNode
}

// Definisikan routes dalam array
const routes: RouteConfig[] = [
  { path: '/', element: <Home /> },
  { path: '/article', element: <Article /> },
  { path: '/photography', element: <Photography /> },
  { path: '/project', element: <Project /> },
  { path: '/design-artwork', element: <Design /> },
  { path: '/ui-ux-design', element: <UIUXDesign /> },
]

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
      {/* Catch all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes