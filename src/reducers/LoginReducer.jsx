import {
    START_LOGIN,
    COMPLETE_LOGIN,
    ERROR_LOGIN,
    START_LOGOUT,
    COMPLETE_LOGOUT,
    ERROR_LOGOUT,
  } from "../types";
  
  const initialState = {
    error: null,
    redirectToRefer: null,
    access:undefined
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case START_LOGIN:
        return {
          ...state,
          error: null,
          redirectToRefer: false,
        };
      case COMPLETE_LOGIN:
        return {
          ...state,
          access: action.payload,
          error: null,
          redirectToRefer: true,
        };
      case ERROR_LOGIN:
        return {
          ...state,
          error: action.payload,
          redirectToRefer: false,
          access:undefined
        };
      case START_LOGOUT:
        return {
          ...state,
          error: null,
          redirectToRefer: false,
        };
      case COMPLETE_LOGOUT:
        return {
          ...state,
          error: null,
          access:undefined,
          redirectToRefer: false,
        };
      case ERROR_LOGOUT:
        return {
          ...state,
          error: null,
          redirectToRefer: false,
        };
      default:
        return state;
    }
  }