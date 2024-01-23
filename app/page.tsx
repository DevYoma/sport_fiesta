"use client";

import Button from "@/components/Button";
import CountDown from "@/components/CountDown";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

// const ServerComponent = dynamic(() => import('../components/CountDown'))

export default function Home() {
  const router = useRouter();
  const targetDate = new Date('2024-01-26T00:00:00')
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <Header />

      <div className="flex flex-col gap-6">
        <CountDown targetDate={targetDate} />
        <Button onClick={() => router.push("/participate")}>
          Participate{" "}
        </Button>
        <Button onClick={() => router.push("/participants")}>
          Check out Participants
        </Button>
        <Button
          onClick={() => alert("Sport Fiesta has not officially started")}
        >
          Scoreboard
        </Button>
      </div>

      <Footer />
    </main>
  );
}
