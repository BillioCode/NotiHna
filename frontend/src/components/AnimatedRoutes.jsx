import { Routes, Route, useLocation } from 'react-router-dom';
import CreatePage from '../pages/CreatePage.jsx'
import HomePage from '../pages/HomePage.jsx'
import NoteDetailsPage from '../pages/NoteDetailsPage.jsx'
import { AnimatePresence } from 'framer-motion'


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={<HomePage />}/>
            <Route path='/create' element={<CreatePage />}/>
            <Route path='/note/:id' element={<NoteDetailsPage />}/>
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes