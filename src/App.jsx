import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import MainRouter from "./MainRouters";

function App() {

  return (
   <BrowserRouter>
    <MainRouter />
   </BrowserRouter>
  )
}

export default App
