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
    pages: null,
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
        categories: action.payload.data,
        error: false,
        loading: false,
        pages: action.payload.meta.last_page,
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