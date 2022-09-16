import {
  START_DELETE_MEASURE,
  COMPLETE_DELETE_MEASURE,
  ERROR_DELETE_MEASURE,
} from "./../../types/measure";
import { API_URL } from "../../config";
import { notify } from "../../components/utils/Notify";

export function deleteUnitMeasureAction(id, token) {
  return (dispatch) => {
    dispatch(startDeleteUnitMeasure());
    fetch(`${API_URL}/api/unitmeasures/${id}`, {
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
        notify("Deleted  unit measure successfully", "success");
        dispatch(completeDeleteUnitMeasure(response));
      })
      .catch((error) => {
        dispatch(errorDeleteUnitMeasure(error));
      });
  };
}

export const startDeleteUnitMeasure = () => ({
  type: START_DELETE_MEASURE,
});

export const completeDeleteUnitMeasure = (response) => ({
  type: COMPLETE_DELETE_MEASURE,
  payload: response,
});

export const errorDeleteUnitMeasure = (error) => ({
  type: ERROR_DELETE_MEASURE,
  payload: error,
});
