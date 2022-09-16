import {
    START_GET_MATERIALS,
    COMPLETE_GET_MATERIALS,
    ERROR_GET_MATERIALS,
    START_CREATE_MATERIAL,
    COMPLETE_CREATE_MATERIAL,
    ERROR_CREATE_MATERIAL,
    START_UPDATE_MATERIAL,
    COMPLETE_UPDATE_MATERIAL,
    ERROR_UPDATE_MATERIAL,
    START_DELETE_MATERIAL,
    COMPLETE_DELETE_MATERIAL,
    ERROR_DELETE_MATERIAL,
  } from "../types/material";
  
  const initialState = {
    materials: [],
    error: null,
    loading: false,
    messageError: null,
    pages: null,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case START_GET_MATERIALS:
        return {
          ...state,
          error: null,
          loading: true,
        };
      case COMPLETE_GET_MATERIALS:
        return {
          ...state,
          materials: action.payload.data,
          error: null,
          loading: false,
          pages: action.payload.meta.last_page,
        };
      case ERROR_GET_MATERIALS:
        return {
          ...state,
          materials: [],
          error: null,
          loading: false,
          messageError: action.payload,
        };
      case START_CREATE_MATERIAL:
        return {
          ...state,
          error: null,
          loading: true,
          materials: state.materials,
        };
      case COMPLETE_CREATE_MATERIAL:
        return {
          ...state,
          error: null,
          loading: false,
          materials: [action.payload.data, ...state.materials],
        };
      case ERROR_CREATE_MATERIAL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case START_UPDATE_MATERIAL:
        return {
          ...state,
          error: null,
          loading: true,
        };
      case COMPLETE_UPDATE_MATERIAL:
        return {
          ...state,
          error: null,
          loading: false,
          materials: state.materials.map((material) =>
            material.id === action.payload.data.id
              ? (material = action.payload.data)
              : material
          ),
        };
      case ERROR_UPDATE_MATERIAL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      case START_DELETE_MATERIAL:
        return {
          ...state,
          error: null,
          loading: true,
        };
      case COMPLETE_DELETE_MATERIAL:
        return {
          ...state,
          error: null,
          loading: false,
          materials: state.materials.filter(
            (material) => material.id !== action.payload.data.id
          ),
        };
      case ERROR_DELETE_MATERIAL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
  
      default:
        return state;
    }
  }
  