'use client'

import Button from '@/components/Button'
import CountDown from '@/components/CountDown'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Button onClick={() => router.push('/participate')} >Participate </Button> 
          <CountDown />
        </div>
        <Button onClick={() => alert("Sport Fiesta has not officially started")}>Scoreboard</Button>
      </div>
    </main>
  )
}
