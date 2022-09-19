import {
    START_GET_LIST_MEASURES,
    COMPLETE_GET_LIST_MEASURES,
    ERROR_GET_LIST_MEASURES,
  } from "../../types/measure";
  
  import { API_URL } from "../../config";
  
  export function getUnitMeasuresListAction(access_token) {
    return (dispatch) => {
      dispatch(startGet());
      let url = `${API_URL}/api/unitmeasures`;
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
    type: START_GET_LIST_MEASURES,
  });
  
  export const completeGet = (data) => ({
    type: COMPLETE_GET_LIST_MEASURES,
    payload: data,
  });
  
  export const errorGet = (error) => ({
    type: ERROR_GET_LIST_MEASURES,
    payload: error,
  });
  