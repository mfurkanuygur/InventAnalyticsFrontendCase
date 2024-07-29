import "./scss/main.scss"

import Nav from './components/nav/Navbar'
import Router from './routes/Router';

function App() {

  return (
    <main className='bg-dark-subtle min-vh-100'>
      {/* <Nav /> */}
      <Router/>
    </main>
  )
}

export default App
