import {
    START_GET_CATEGORIES,
    COMPLETE_GET_CATEGORIES,
    ERROR_GET_CATEGORIES,
} from "../types";

import {API_URL} from '../config';
  
  export function getCategoriesAction(access_token,page) {
    return (dispatch) => {
      dispatch(startGetCategories());
      fetch(`${API_URL}/api/categories/paginate?page=${page}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          dispatch(completeGetCategories(response));
        })
        .catch((error) => {
          dispatch(errorGetCategories(error));
        });
    };
  }
  
  export const startGetCategories = () => ({
    type: START_GET_CATEGORIES,
  });
  
  export const completeGetCategories = (categories) => ({
    type: COMPLETE_GET_CATEGORIES,
    payload: categories,
  });
  
  export const errorGetCategories = (error) => ({
    type: ERROR_GET_CATEGORIES,
    payload: error,
  });