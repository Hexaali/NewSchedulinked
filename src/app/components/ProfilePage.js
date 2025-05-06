"use client"
// app/profile/page.js
import { Suspense } from 'react'
import ProfileContent from './ProfileContent'
import { Spinner } from '@material-tailwind/react'

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-20 w-20 text-gray-900/50" />
      </div>
    }>
      <ProfileContent />
    </Suspense>
  )
}