import React, { useState } from 'react';
import Przycisk from './Przycisk';

const NowyLicznik: React.FC = () => {
  // Stan licznika zaczynający się od 0
  const [liczba, setLiczba] = useState(0);

  // Funkcja do inkrementacji licznika
  const dodaj = () => {
    setLiczba(liczba + 1);
  };

  return (
    <div>
      <h3>Licznik: {liczba}</h3>
      
      <Przycisk click={dodaj} />
    </div>
  );
};

export default NowyLicznik;