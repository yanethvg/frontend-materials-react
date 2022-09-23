import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
//Redux
import { useSelector } from 'react-redux'

const PrivateRoute = ({ permission }) => {
    const auth = useSelector(state => state.auth.access);
    let permissions = [];
    permissions = auth.permissions;
   
    return auth && permissions.includes(permission) ? <Outlet /> : <Navigate to="/login" />;
}

export {PrivateRoute}