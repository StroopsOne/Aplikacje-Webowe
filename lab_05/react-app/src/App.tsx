import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Koszyk from './components/koszyk/Koszyk'
import NowyKoszyk from './components/koszyk/NowyKoszyk'
import NowyLicznik from './components/liczniki/NowyLicznik'
import Logowanie from './components/formularze/Logowanie'
import Haslo from './components/formularze/Haslo'
import Formularz from './components/formularze/Formularz'
import Ternary from './components/inne/Ternary'
import Aktualizacja from './components/inne/Aktualizacja'
import Studenci from './components/studenci/Studenci'
import StudentManager from './components/studenci/StudentManager'
import Licznik2 from './components/efekty/Licznik2'
import Tytul from './components/efekty/Tytul'
import Odliczanie from './components/efekty/Odlicznie'
import Komentarz from './components/produkty/Komentarz'
import Komentarze from './components/produkty/Komentarze'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Tytul/>

    </div>
  )
}

export default App
