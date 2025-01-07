import React from 'react';

const Ternary: React.FC = () => {
  // Tworzymy zmienne a i b, które będą typu boolean
  const a = true; // Domyślnie prawda
  const b = false; // Domyślnie fałsz

  return (
    <div>
      {/* Ternary operator dla zmiennej a */}
      {a ? <div>Stwierdzenie a jest prawdziwe</div> : <div>Stwierdzenie a jest fałszywe</div>}
      
      {/* Ternary operator dla zmiennej b */}
      {b ? <div>Stwierdzenie b jest prawdziwe</div> : <div>Stwierdzenie b jest fałszywe</div>}
    </div>
  );
};

export default Ternary;