import React, { useState } from 'react';

const Haslo: React.FC = () => {
  // Tworzymy stany dla obu pól (hasło i powtórz hasło)
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');

  // Funkcje do obsługi zmian w inputach
  const HandlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const HandleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
  };

  // Funkcja do walidacji haseł
  const validatePassword = () => {
    if (!password || !repeatPassword) {
        setMessage('Proszę wprowadzić hasło');
    } else if (password !== repeatPassword) {
        setMessage('Hasła nie są zgodne');
    } else {
        setMessage('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Hasło"
        value={password}
        onChange={HandlePasswordChange}
        onBlur={validatePassword} // Walidacja po utracie fokusu na polu
      />
      <input
        type="text"
        placeholder="Powtórz Hasło"
        value={repeatPassword}
        onChange={HandleRepeatPasswordChange}
        onBlur={validatePassword} // Walidacja po utracie fokusu na polu
      />
      <div>{message}</div> {/* Wyświetlanie komunikatu błędów */}
    </div>
  );
};

export default Haslo;