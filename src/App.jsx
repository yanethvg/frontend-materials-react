import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import {Routers} from "./Routers";
import { Menu } from "./components/basic/Menu";

function App() {

  return (
   <BrowserRouter>
      <Menu />
      <Routers />
   </BrowserRouter>
  )
}

export default App
