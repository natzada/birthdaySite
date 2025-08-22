/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const Countdown: React.FC = () => {
  const startDate = new Date("2025-05-31T18:30:00");
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center text-lg mb-5 bg-gray-800 text-white p-2 m-3 rounded-lg bg-opacity-50 text-sm sm:text-lg mb-5 px-4">
      <p>
        Eu te amo há <span className="text-red-500">{time.days}</span> dias, <span className="text-red-500">{time.hours}</span>{" "}
        horas, <span className="text-red-500">{time.minutes}</span> minutos e <span className="text-red-500">{time.seconds}</span>{" "}
        segundos
      </p>
    </div>
  );
};

export default Countdown;
