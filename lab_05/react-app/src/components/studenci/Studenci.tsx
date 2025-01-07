import React from 'react';

// Interfejs dla studenta
interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

// Tablica studentów
const Students: Student[] = [
  { imie: 'Jan', nazwisko: 'Kowalski', rocznik: 2003 },
  { imie: 'Anna', nazwisko: 'Nowak', rocznik: 2004 },
  { imie: 'Piotr', nazwisko: 'Zielinski', rocznik: 2005 },
];

const Studenci: React.FC = () => {
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
          {Students.map((student, index) => (
            <tr key={index}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Studenci;