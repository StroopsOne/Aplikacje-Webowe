import React, { useState } from 'react';

const Licznik: React.FC = () => {
  // Stan licznika zaczynający się od 0
  const [liczba, setLiczba] = useState(0);

  // Funkcja do inkrementacji licznika
  const dodaj = () => {
    setLiczba(liczba + 1);
  };

  return (
    <div>
      <h3>Licznik: {liczba}</h3>
      <button onClick={dodaj}>Dodaj</button>
    </div>
  );
};

export default Licznik;