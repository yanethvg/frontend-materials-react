import {
  START_UPDATE_MEASURE,
  COMPLETE_UPDATE_MEASURE,
  ERROR_UPDATE_MEASURE,
} from "../../types/measure";
import { API_URL } from "../../config";
import { notify } from "../../components/utils/Notify";

export function updateUnitMeasureAction(id, unit_measure, token) {
  return (dispatch) => {
    dispatch(startUpdateUnitMeasure());
    // get auth api
    fetch(`${API_URL}/api/unitmeasures/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(unit_measure),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        if (response.errors) {
          notify(response.message, "error");
          dispatch(errorUpdateUnitMeasure(response.errors));
        } else {
          notify("Updated unit measure successfully", "success");
          dispatch(completeUpdateUnitMeasure(response));
        }
      })
      .catch((error) => {
        dispatch(errorUpdateUnitMeasure(error));
      });
  };
}

export const startUpdateUnitMeasure = () => ({
  type: START_UPDATE_MEASURE,
});

export const completeUpdateUnitMeasure = (response) => ({
  type: COMPLETE_UPDATE_MEASURE,
  payload: response,
});

export const errorUpdateUnitMeasure = (error) => ({
  type: ERROR_UPDATE_MEASURE,
  payload: error,
});
