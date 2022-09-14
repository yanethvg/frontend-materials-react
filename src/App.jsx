import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Routers } from "./Routers";
import { Menu } from "./components/basic/Menu";
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
   <BrowserRouter>
      <Menu />
      <ToastContainer autoClose={8000} />
      <Container>
      <Routers />
      </Container>
   </BrowserRouter>
  )
}

export default App
