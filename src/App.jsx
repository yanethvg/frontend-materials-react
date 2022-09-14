import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Routers } from "./Routers";
import { Menu } from "./components/basic/Menu";
import { Container } from 'react-bootstrap';

function App() {

  return (
   <BrowserRouter>
      <Menu />
      <Container>
      <Routers />
      </Container>
   </BrowserRouter>
  )
}

export default App
