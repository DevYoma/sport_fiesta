'use client'

import Button from '@/components/Button'
import CountDown from '@/components/CountDown'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'

export default function Home() {
  
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <Header />

      <div className="flex flex-col gap-6">
          <Button onClick={() => router.push('/participate')} >Participate </Button> 
          {/* <CountDown /> */}
        {/* <Button onClick={() => router.push('/supa')} >SupaBase</Button> */}
        <Button onClick={() => alert("Sport Fiesta has not officially started")}>Scoreboard</Button>
        <Button onClick={() => router.push('/participants')}>Check out Participants</Button>
      </div>

      <Footer />
    </main>
  )
}
