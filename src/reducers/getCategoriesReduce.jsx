import {
    START_GET_CATEGORIES,
    COMPLETE_GET_CATEGORIES,
    ERROR_GET_CATEGORIES,
  } from '../types'
  
  const initialState = {
    categories: [],
    error: null,
    loading: false,
    messageError: null,
  }
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case START_GET_CATEGORIES:
        return {
          ...state,
          error: null,
          loading: true
        }
      case COMPLETE_GET_CATEGORIES:
        return {
          ...state,
          categories: action.payload,
          error: false,
          loading: false,
        }
      case ERROR_GET_CATEGORIES:
        return {
          ...state,
          categories: [],
          error: true,
          loading: false,
          messageError: action.payload
        }
      default:
        return state
    }
  }