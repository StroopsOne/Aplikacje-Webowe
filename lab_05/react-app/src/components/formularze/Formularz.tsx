import React, { useState } from 'react';

const Formularz: React.FC = () => {
  // Tworzymy stan do przechowywania tekstu wpisanego w inpucie
  const [text, setText] = useState('');

  // Funkcja do aktualizacji stanu w odpowiedzi na zmianę w inpucie
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleInputChange} // Zaktualizowanie stanu za każdym razem, gdy coś wpiszemy
      />
      <div>{text}</div> {/* Wyświetlanie tekstu na żywo */}
    </div>
  );
};

export default Formularz;