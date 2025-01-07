import React from 'react';

interface PrzyciskProps {
    click: () => void;
}

const Przycisk: React.FC<PrzyciskProps> = ({ click }) => {
  return <button onClick={click}>Dodaj</button>;
};

export default Przycisk;