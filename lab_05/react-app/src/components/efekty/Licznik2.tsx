import React, { useState, useEffect } from 'react';

const Licznik2: React.FC = () => {
  // Stan licznika zaczynający się od 0
  const [liczba, setLiczba] = useState(0);

  // Efekt do wypisywania wiadomości po załadowaniu komponentu
  useEffect(() => {
    console.log('Hello world');
  }, []);

  // Efekt do śledzenia zmian w liczniku
  useEffect(() => {
    console.log(`Licznik zwiększył się do ${liczba}`); 
  }, [liczba]); 
  
  const dodaj = () => {
    setLiczba((prev) => prev + 1);
  };

  return (
    <div>
      <h3>Licznik: {liczba}</h3>
      <button onClick={dodaj}>Dodaj</button>
    </div>
  );
};

export default Licznik2;