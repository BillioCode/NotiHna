
import Navbar from './components/Navbar.jsx'
import AnimatedRoutes from './components/AnimatedRoutes.jsx';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer.jsx';
function App() {

  return (
  <>
    <Navbar />
      <AnimatedRoutes />
    <Footer />
      <Toaster  /> 
  </>
  )
}

export default App
