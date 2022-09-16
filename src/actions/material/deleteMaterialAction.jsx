import {
    START_DELETE_MATERIAL,
    COMPLETE_DELETE_MATERIAL,
    ERROR_DELETE_MATERIAL,
  } from "./../../types/material";
  import { API_URL } from "../../config";
  import { notify } from "../../components/utils/Notify";
  
  export function deleteMaterialAction(id, token) {
    return (dispatch) => {
      dispatch(startDelete());
      fetch(`${API_URL}/api/materials/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          notify("Deleted material successfully", "success");
          dispatch(completeDelete(response));
        })
        .catch((error) => {
          dispatch(errorDelete(error));
        });
    };
  }
  
  export const startDelete = () => ({
    type: START_DELETE_MATERIAL,
  });
  
  export const completeDelete = (response) => ({
    type: COMPLETE_DELETE_MATERIAL,
    payload: response,
  });
  
  export const errorDelete = (error) => ({
    type: ERROR_DELETE_MATERIAL,
    payload: error,
  });
  