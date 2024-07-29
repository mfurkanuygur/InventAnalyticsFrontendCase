import { useState } from 'react'
import Router from './routes/Router'
import { Bounce, Flip, Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='min-h-dvh min-w-full bg-secondary container mx-auto  text-secondary'>
      <Navbar />
      <Router />
      <Footer />
      <ToastContainer
        stacked
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Flip} />
    </main>
  )
}

export default App
