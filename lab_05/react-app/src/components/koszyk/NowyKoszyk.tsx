import React from 'react';
import Produkt from './Produkt';

const NowyKoszyk: React.FC = () => {
  // Tablica z nazwami produktów
  const Produkty: string[] = ['Jabłko', 'Gruszka', 'Banan', 'Pomarańcza', 'Kiwi'];

  return (
    <div>
      <h2>Koszyk</h2>
      {Produkty.map((nazwa, index) => (
        <Produkt key={index} nazwa={nazwa} />
      ))}
    </div>
  );
};

export default NowyKoszyk;