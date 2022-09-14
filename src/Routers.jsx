import React from "react";
import { useRoutes } from "react-router-dom";
import { HomePage } from "./containers/HomePage";
import { ProfilePage } from "./containers/ProfilePage";
import { MaterialsPage } from "./containers/MaterialsPage";
import { MeasuresPage } from "./containers/MeasuresPage";
import { CategoriesPage } from "./containers/CategoriesPage";
import { LoginPage } from "./containers/LoginPage";
import { RegisterPage } from "./containers/RegisterPage";


const routes = [
  {
      path: '/',
      element: <HomePage />,
      text: 'Home'
  },
  {
      path: '/profile',
      element: <ProfilePage />,
      text: 'Profile'
  },
  {
      path: '/materials',
      element: <MaterialsPage />,
      text: 'Materials'
  },
  {
    path: '/categories',
    element: <CategoriesPage />,
    text: 'Categories'
  },
  {
    path: '/measures',
    element: <MeasuresPage />,
    text: 'Measures'
  },
  {
    path: '/login',
    element: <LoginPage />,
    text: 'Login'
  },
  {
    path: '/register',
    element: <RegisterPage />,
    text: 'Register'
  },
  {
    path: '*',
    element: <p>Not found</p>,
    text: 'Not Found'
  },
]

function Routers() {
  
  const elements = useRoutes(routes)
  return elements
}

export { Routers, routes };


