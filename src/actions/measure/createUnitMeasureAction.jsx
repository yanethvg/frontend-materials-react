import {
  START_CREATE_MEASURE,
  COMPLETE_CREATE_MEASURE,
  ERROR_CREATE_MEASURE,
} from "./../../types/measure";
import { API_URL } from "../../config";
import { notify } from "../../components/utils/Notify";

export function createUnitMeasureAction(unit_measure, token) {
  return (dispatch) => {
    dispatch(startCreateUnitMeasure());
    fetch(`${API_URL}/api/unitmeasures`, {
      method: "POST",
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
          dispatch(errorCreateUnitMeasure(response.errors));
        } else {
          notify("Created unit measure successfully", "success");
          dispatch(completeCreateUnitMeasure(response));
        }
      })
      .catch((error) => {
        dispatch(errorCreateUnitMeasure(error));
      });
  };
}

export const startCreateUnitMeasure = () => ({
  type: START_CREATE_MEASURE,
});

export const completeCreateUnitMeasure = (response) => ({
  type: COMPLETE_CREATE_MEASURE,
  payload: response,
});

export const errorCreateUnitMeasure = (error) => ({
  type: ERROR_CREATE_MEASURE,
  payload: error,
});
