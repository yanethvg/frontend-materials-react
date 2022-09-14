import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./containers/HomePage";
import { ProfilePage } from "./containers/ProfilePage";
import { MaterialsPage } from "./containers/MaterialsPage";
import { MeasuresPage } from "./containers/MeasuresPage";
import { CategoriesPage } from "./containers/CategoriesPage";
import { LoginPage } from "./containers/LoginPage";
import { RegisterPage } from "./containers/RegisterPage";
import { Menu } from "./components/basic/Menu";

function MainRouter() {
    return (
      <div>
        <Menu></Menu>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/materials" element={<MaterialsPage />} />
            <Route path="/measures" element={<MeasuresPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </div>
    );
  }
  
  export default MainRouter;


