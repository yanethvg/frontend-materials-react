import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
//Redux
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
    const auth = useSelector(state => state.auth.access);
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export {PrivateRoute}