import {
    START_CREATE_MATERIAL,
    COMPLETE_CREATE_MATERIAL,
    ERROR_CREATE_MATERIAL,
  } from "./../../types/material";
  import { API_URL } from "../../config";
  import { notify } from "../../components/utils/Notify";
  
  export function createMaterialAction(material, token) {
    console.log(material);
    return (dispatch) => {
      dispatch(startCreate());
      fetch(`${API_URL}/api/materials`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(material),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          if (response.errors) {
            notify(response.message, "error");
            dispatch(errorCreate(response.errors));
          } else {
            notify("Created material successfully", "success");
            dispatch(completeCreate(response));
          }
        })
        .catch((error) => {
          dispatch(errorCreate(error));
        });
    };
  }
  
  export const startCreate= () => ({
    type: START_CREATE_MATERIAL,
  });
  
  export const completeCreate= (response) => ({
    type: COMPLETE_CREATE_MATERIAL,
    payload: response,
  });
  
  export const errorCreate= (error) => ({
    type: ERROR_CREATE_MATERIAL,
    payload: error,
  });
  