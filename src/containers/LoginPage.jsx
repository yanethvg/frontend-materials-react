import React,{ useState } from 'react';
import { Login } from '../components/auth/Login';
import Alert from 'react-bootstrap/Alert';
//Redux
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../actions/loginAction";
//react router dom
import { Navigate } from 'react-router-dom';

function LoginPage() {
  //state
  const [email, saveEmail] = useState("");
  const [password, savePassword] = useState("");
  //redux
  const dispatch = useDispatch();

  const redirectToRefer = useSelector((state) => state.auth.redirectToRefer);
  const error = useSelector((state) => state.auth.error);
  const login = (user) => dispatch(getLogin(user));

  const clickSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    login(user);
  };

  if (redirectToRefer) {
    return  <Navigate to="/"/>
  }
  return (
   <>
    {Login(saveEmail, savePassword, clickSubmit,error)}
   </>
  );
}

export { LoginPage };