import React from "react";
import { useRoutes,Route, Routes } from "react-router-dom";
import { HomePage } from "./containers/HomePage";
import { ProfilePage } from "./containers/ProfilePage";
import { MaterialsPage } from "./containers/MaterialsPage";
import { MeasuresPage } from "./containers/MeasuresPage";
import { CategoriesPage } from "./containers/CategoriesPage";
import { LoginPage } from "./containers/LoginPage";
import { RegisterPage } from "./containers/RegisterPage";
import {PrivateRoute } from "./components/auth/PrivateRoute";


{/* <PrivateRoute
path="/get/categories"
exact
component={CategoryContainer}
></PrivateRoute> */}


const routes = [
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
]

function Routers() {
  
  // const elements = useRoutes(routes);
  // return elements

  return(
    <Routes>
      <Route path="/" exact element={<HomePage/>}></Route>
      <Route path="/login" exact element={<LoginPage/>}></Route>
      <Route path="/register" exact element={<RegisterPage/>}></Route>
        {routes.map((route, index) => {
          return <Route
            key={index}
            path={route.path}
            exact
            element={<PrivateRoute/>}
          >
             <Route path={route.path} element={route.element}/>
          </Route>
        } )}
        {/* <Route exact path='/' element={<PrivateRoute/>}>
          <Route path='profile' element={<ProfilePage/>}/>
        </Route> */}
    </Routes>
  )
}

export { Routers, routes };


