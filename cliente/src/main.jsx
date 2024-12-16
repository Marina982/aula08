import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Registrar from './pages/Registro'
import Alterar from './pages/Alterar'
import Produtos from './pages/Produtos'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/registro" element={<Registrar/>}/>
            <Route path="/Alterar/:id" element={<Alterar/>}/>
            <Route path="/Produtos" element={<Produtos/>}/>
       </Routes>
    </BrowserRouter>
  </StrictMode>,
)
