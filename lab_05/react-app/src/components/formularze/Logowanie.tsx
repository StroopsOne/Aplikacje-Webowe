import React, { useState } from 'react';

const Logowanie: React.FC = () => {
  // Tworzymy stany dla wszystkich pól formularza
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');

  // Funkcje do obsługi zmian w inputach
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
  };

  // Funkcja do walidacji hasła
  const validateForm = () => {
    // Sprawdzamy, czy wszystkie pola są wypełnione
    if (!username || !password || !repeatPassword) {
      return false;
    }

    // Sprawdzamy, czy hasła są zgodne
    if (password !== repeatPassword) {
      setMessage('Passwords do not match');
      return false;
    }

    // Resetowanie komunikatu, jeśli hasła są zgodne
    setMessage('');
    return true;
  };

  // Funkcja do obsługi kliknięcia przycisku
  const handleLoginClick = () => {
    // Sprawdzamy, czy formularz jest poprawny
    if (validateForm()) {
      alert('Logged in successfully');
    } else {
      // Jeśli formularz jest niepoprawny, wyświetlamy komunikat
      alert(message || 'Passwords do not match');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <input
        type="password"
        placeholder="Repeat Password"
        value={repeatPassword}
        onChange={handleRepeatPasswordChange}
      />
      <button
        // Przycisk jest aktywowany tylko wtedy, gdy wszystkie pola są wypełnione
        disabled={!username || !password || !repeatPassword || password !== repeatPassword}
        onClick={handleLoginClick}
      >
        Login
      </button>
      
      {/* Wyświetlanie komunikatu w przypadku błędu */}
      <div style={{ color: 'red' }}>{message}</div>
    </div>
  );
};

export default Logowanie;