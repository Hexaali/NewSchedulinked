// components/ProfilePageWrapper.js
'use client'

import { useSearchParams } from 'next/navigation'
import LandingPage from './LandingPage'
import ProfilePage from './ProfilePage'

export default function ProfilePageWrapper() {
  const searchParams = useSearchParams()
  const username = searchParams.get('u')

  return username ? <ProfilePage username={username} /> : <LandingPage />
}