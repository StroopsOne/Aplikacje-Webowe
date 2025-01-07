import React, { useState, useEffect } from 'react';

const Tytul: React.FC = () => {
  const [title, setTitle] = useState('');

  // Obsługa zmiany wartości inputa
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // useEffect do aktualizacji tytułu strony
  useEffect(() => {
    document.title = title || 'Default Title'; // Jeśli pole jest puste, ustaw domyślny tytuł
  }, [title]); // Wywołaj efekt przy każdej zmianie `title`

  return (
    <div>
      <input
        type="text"
        placeholder="Wpisz tytuł strony"
        value={title}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Tytul;