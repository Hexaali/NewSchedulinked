// app/page.js
import { Suspense } from 'react'
import ProfilePageWrapper from './components/ProfilePageWrapper'


export default function Home() {
  return (
    <main>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }>
        <ProfilePageWrapper />
      </Suspense>
    </main>
  )
}