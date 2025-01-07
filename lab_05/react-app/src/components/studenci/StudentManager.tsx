import React, { useState } from 'react';

// Interfejs dla studenta
interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

// Komponent Dodawanie
const Dodawanie: React.FC<{ onAdd: (student: Student) => void }> = ({ onAdd }) => {
  const [imie, setImie] = useState('');
  const [nazwisko, setNazwisko] = useState('');
  const [rocznik, setRocznik] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!imie || !nazwisko || !rocznik) {
      alert('Proszę wypełnić wszystkie pola');
      return;
    }

    if (isNaN(Number(rocznik))) {
      alert('Rocznik musi być liczbą');
      return;
    }

    const newStudent: Student = { imie, nazwisko, rocznik: Number(rocznik) };

    onAdd(newStudent);

    // Wyczyść formularz
    setImie('');
    setNazwisko('');
    setRocznik('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Imię"
          value={imie}
          onChange={(e) => setImie(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nazwisko"
          value={nazwisko}
          onChange={(e) => setNazwisko(e.target.value)}
        />
        <input
          type="text"
          placeholder="Rocznik"
          value={rocznik}
          onChange={(e) => setRocznik(e.target.value)}
        />
        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
};

// Komponent StudentManager
const StudentManager: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { imie: 'Jan', nazwisko: 'Kowalski', rocznik: 2003 },
    { imie: 'Anna', nazwisko: 'Nowak', rocznik: 2004 },
    { imie: 'Piotr', nazwisko: 'Zielinski', rocznik: 2005 },
  ]);

  const addStudent = (newStudent: Student) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formularz do dodawania studentów */}
      <Dodawanie onAdd={addStudent} />
    </div>
  );
};

export default StudentManager;