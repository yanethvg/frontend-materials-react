import {
  START_UPDATE_MATERIAL,
  COMPLETE_UPDATE_MATERIAL,
  ERROR_UPDATE_MATERIAL,
} from "../../types/material";
import { API_URL } from "../../config";
import { notify } from "../../components/utils/Notify";

export function updateMaterialAction(id, material, token) {
  return (dispatch) => {
    dispatch(startUpdate());
    fetch(`${API_URL}/api/materials/${id}`, {
      method: "PUT",
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
          dispatch(errorUpdate(response.errors));
        } else {
          notify("Updated material successfully", "success");
          dispatch(completeUpdate(response));
        }
      })
      .catch((error) => {
        dispatch(errorUpdate(error));
      });
  };
}

export const startUpdate = () => ({
  type: START_UPDATE_MATERIAL,
});

export const completeUpdate = (response) => ({
  type: COMPLETE_UPDATE_MATERIAL,
  payload: response,
});

export const errorUpdate= (error) => ({
  type: ERROR_UPDATE_MATERIAL,
  payload: error,
});
