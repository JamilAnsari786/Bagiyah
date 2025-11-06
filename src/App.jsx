import './App.css'
import Nav from './components/Nav/Nav'
import { StoreProvider } from './context/StoreContext'
import Footer from './components/Footer/Footer'
import Home from './Pages/Home/Home'
import Menu from './Pages/Menu/Menu'
import Cart from './Pages/Cart/Cart'
import Contact from './Pages/Contact/Contact'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="App">
          <Nav />
          <main className="main-content">
            <Routes>
              {/* ✅ All sections on the Home page */}
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <Menu />
                    <Contact />
                  </>
                }
              />

              {/* ✅ Cart as a separate page */}
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </StoreProvider>
  )
}

export default App
