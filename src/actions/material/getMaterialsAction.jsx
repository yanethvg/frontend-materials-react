import {
    START_GET_MATERIALS,
    COMPLETE_GET_MATERIALS,
    ERROR_GET_MATERIALS,
} from "../../types/material";

import {API_URL} from '../../config';
import {notify} from '../../components/utils/Notify';
  
export function getMaterialsAction(access_token,page, search, category, measure) {
    return (dispatch) => {
    dispatch(startGetMaterials());
    let url = `${API_URL}/api/materials?page=${page}&search=${search}`;
    if (category) {
        url += `&category=${category}`;
    }
    if (measure) {
        url += `&measure=${measure}`;
    }
    if (search) {
        url += `&search=${search}`;
    }

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
        notify('Materials ready', 'success');
        dispatch(completeGetMaterials(response));
    })
    .catch((error) => {
        dispatch(errorGetMaterials(error));
    });
    };
  }
  
  export const startGetMaterials = () => ({
    type: START_GET_MATERIALS,
  });
  
  export const completeGetMaterials = (data) => ({
    type: COMPLETE_GET_MATERIALS,
    payload: data,
  });
  
  export const errorGetMaterials = (error) => ({
    type: ERROR_GET_MATERIALS,
    payload: error,
  });