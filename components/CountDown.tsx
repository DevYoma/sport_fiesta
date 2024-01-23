import { useEffect, useState } from "react"

type CountDownProp = {
  targetDate: Date;
}

type TimeProp = {
  days: number | any, 
  hours: number | any, 
  minutes: number | any, 
  seconds: number | any,
}

const CountDown = ({ targetDate }: CountDownProp) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeProp;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };

      return timeLeft;
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const formatTime = (value: number) => (value < 10 ? `0${value}` : `${value}`)

  return (
    <div className="text-3xl text-center">
      {timeLeft?.days && (<p>{timeLeft.days} days</p>)}

      <p>
        {formatTime(timeLeft?.hours)} hours :{formatTime(timeLeft?.minutes)} minutes 
        {/* :{formatTime(timeLeft?.seconds)} seconds */}
      </p>
    </div>
  )
}

export default CountDown