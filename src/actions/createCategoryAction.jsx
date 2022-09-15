import {
    START_CREATE_CATEGORY,
    COMPLETE_CREATE_CATEGORY,
    ERROR_CREATE_CATEGORY,
  } from "../types";
import {API_URL} from '../config';
  
  export function createCategoryAction(category, token) {
    return (dispatch) => {
      dispatch(startCreateCategory());
      // get auth api
      fetch(`${API_URL}/api/categories`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          if (response.err) {
            console.log(response.err);
            dispatch(errorCreateCategory(response.err.message));
          } else {
            console.log(response);
            dispatch(completeCreateCategory(response));
          }
        })
        .catch((error) => {
          dispatch(errorCreateCategory(error));
        });
    };
  }
  
  export const startCreateCategory = () => ({
    type: START_CREATE_CATEGORY,
  });
  
  export const completeCreateCategory = (response) => ({
    type: COMPLETE_CREATE_CATEGORY,
    payload: response,
  });
  
  export const errorCreateCategory = (message) => ({
    type: ERROR_CREATE_CATEGORY,
    payload: message,
  });