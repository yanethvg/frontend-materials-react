import {
  START_DELETE_CATEGORY,
  COMPLETE_DELETE_CATEGORY,
  ERROR_DELETE_CATEGORY,
} from "./../../types/category";
import { API_URL } from "../../config";
import { notify } from "../../components/utils/Notify";

export function deleteCategoryAction(id, token) {
  return (dispatch) => {
    dispatch(startDeleteCategory());
    fetch(`${API_URL}/api/categories/${id}`, {
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
        notify("Deleted category successfully", "success");
        dispatch(completeDeleteCategory(response));
      })
      .catch((error) => {
        dispatch(errorDeleteCategory(error));
      });
  };
}

export const startDeleteCategory = () => ({
  type: START_DELETE_CATEGORY,
});

export const completeDeleteCategory = (response) => ({
  type: COMPLETE_DELETE_CATEGORY,
  payload: response,
});

export const errorDeleteCategory = (error) => ({
  type: ERROR_DELETE_CATEGORY,
  payload: error,
});
