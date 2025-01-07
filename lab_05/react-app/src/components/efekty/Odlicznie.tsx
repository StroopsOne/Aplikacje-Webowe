import React, { useState, useEffect } from 'react';

const Odliczanie: React.FC = () => {
  const [time, setTime] = useState(15); // Stan licznika
  const [isRunning, setIsRunning] = useState(false); // Czy licznik działa

  // Funkcja do obsługi start/stop
  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  // useEffect do obsługi odliczania
  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && time > 0) {
      interval = window.setInterval(() => {
        setTime((prev) => Math.max(prev - 0.1, 0)); // Zapewnia, że licznik nie spadnie poniżej 0
      }, 100);
    }

    if (time === 0) {
      setIsRunning(false); // Zatrzymaj licznik po osiągnięciu 0
    }

    // Czyszczenie interwału przy odmontowaniu komponentu lub zmianie
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time]);

  return (
    <div>
      <h3>{time.toFixed(1)} sekundy</h3> {/* Wyświetlanie z dokładnością do 0.1 sekundy */}
      <button
        onClick={toggleTimer}
        disabled={time === 0}
      >
        {time === 0 ? 'Odliczanie zakończone' : isRunning ? 'STOP' : 'START'}
      </button>
    </div>
  );
};

export default Odliczanie;