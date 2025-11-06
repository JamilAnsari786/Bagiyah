import './App.css'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'

import Cart from './pages/Cart/Cart'
import Contact from './pages/Contact/Contact'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menuu from './pages/Menus/Menuu'


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Menuu />
                  <Contact />
                </>
              }
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App