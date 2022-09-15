import {
    START_GET_CATEGORIES,
    COMPLETE_GET_CATEGORIES,
    ERROR_GET_CATEGORIES,
    START_CREATE_CATEGORY,
    COMPLETE_CREATE_CATEGORY,
    ERROR_CREATE_CATEGORY,
    START_UPDATE_CATEGORY,
    COMPLETE_UPDATE_CATEGORY,
    ERROR_UPDATE_CATEGORY,
    START_DELETE_CATEGORY,
    COMPLETE_DELETE_CATEGORY,
    ERROR_DELETE_CATEGORY
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
        error: null,
        loading: false,
        pages: action.payload.meta.last_page,
        }
      case ERROR_GET_CATEGORIES:
        return {
          ...state,
          categories: [],
          error: null,
          loading: false,
          messageError: action.payload
        }
      case START_CREATE_CATEGORY:
          return {
            ...state,
            error: null,
            messageError: null
          }
      case COMPLETE_CREATE_CATEGORY:
          return {
            ...state,
            error: null,
            messageSuccess: "Category created successfully",
            categories: [...state.categories, action.payload.data]
          }
      case ERROR_CREATE_CATEGORY:
          return {
            ...state,
            error: true,
            messageError: action.payload
          }
      case START_UPDATE_CATEGORY:
            return {
              ...state,
              error: null,
              loading: true
            }
      case COMPLETE_UPDATE_CATEGORY:
          return {
            ...state,
            error: null,
            loading: false,
            categories: state.categories.map(category =>
                category.id === action.payload.data.id
                  ? (category = action.payload.data)
                  : category
            )
          }
      case ERROR_UPDATE_CATEGORY:
          return {
            ...state,
            error: action.payload,
            loading: false,
          }
      default:
        return state
    }
  }