import React, { useEffect, useState } from "react"

function Timer({ expiryDate }) {
    const [ time, setTime ] = useState()

    useEffect(() => {
        const intervalId = setInterval(() => {
            const timeLeft = expiryDate - Date.now()
            const secondsLeft = Math.floor(timeLeft / 1000)
            const minLeft = Math.floor(secondsLeft / 60)
            const hoursLeft = Math.floor(minLeft / 60)
            setTime(`${hoursLeft}h ${minLeft % 60}m ${secondsLeft % 60}s`)
          }, 1000);
          return () => clearInterval(intervalId) 

        }, [expiryDate]);

    return <div className="de_countdown">{time}</div>
        
}

export default Timer;