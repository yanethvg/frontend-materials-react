import React from 'react';
// toast react
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// notify react toast
const notify = (message, type) => toast(`${message}`, {
    type: type,
    theme: "colored",
    icon: true,
    draggable: true,
    autoClose: 1000,
  })

export { notify };