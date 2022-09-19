import {
  START_GET_LIST_CATEGORIES,
  COMPLETE_GET_LIST_CATEGORIES,
  ERROR_GET_LIST_CATEGORIES,
} from "../../types/category";

import { API_URL } from "../../config";

export function getCategoriesListAction(access_token) {
  return (dispatch) => {
    dispatch(startGet());
    let url = `${API_URL}/api/categories`;
    fetch(`${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        dispatch(completeGet(response));
      })
      .catch((error) => {
        dispatch(errorGet(error));
      });
  };
}

export const startGet = () => ({
  type: START_GET_LIST_CATEGORIES,
});

export const completeGet = (data) => ({
  type: COMPLETE_GET_LIST_CATEGORIES,
  payload: data,
});

export const errorGet = (error) => ({
  type: ERROR_GET_LIST_CATEGORIES,
  payload: error,
});
