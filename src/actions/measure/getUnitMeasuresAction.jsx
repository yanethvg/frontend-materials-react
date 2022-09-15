import {
    START_GET_MEASURES,
    COMPLETE_GET_MEASURES,
    ERROR_GET_MEASURES,
} from "../../types/measure";

import {API_URL} from '../../config';
import {notify} from '../../components/utils/Notify';
  
  export function getUnitMeasuresAction(access_token,page, search) {
    return (dispatch) => {
      dispatch(startGetUnitMeasures());
      fetch(`${API_URL}/api/unitmeasures/paginate?page=${page}&search=${search}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          notify('Measures ready', 'success');
          dispatch(completeGetUnitMeasures(response));
        })
        .catch((error) => {
          dispatch(errorGetUnitMeasures(error));
        });
    };
  }
  
  export const startGetUnitMeasures = () => ({
    type: START_GET_MEASURES,
  });
  
  export const completeGetUnitMeasures = (data) => ({
    type: COMPLETE_GET_MEASURES,
    payload: data,
  });
  
  export const errorGetUnitMeasures = (error) => ({
    type: ERROR_GET_MEASURES,
    payload: error,
  });