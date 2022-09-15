import { COMPLETE_LOGOUT, START_LOGOUT, ERROR_LOGOUT } from "../types";
import {notify} from '../components/utils/Notify';
import {API_URL} from '../config';

export function getLogout(access_token) {
  return (dispatch) => {
    dispatch(startLogout());
    localStorage.removeItem("auth");
    // get auth api
    fetch(`${API_URL}/api/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
        },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        notify(response.message,  'success');
        dispatch(completeLogout());
      })
      .catch((error) => {
        notify(error.message, 'error');
        dispatch(errorLogout());
      });
  };
}

export const startLogout = () => ({
  type: START_LOGOUT,
});

export const completeLogout = () => ({
  type: COMPLETE_LOGOUT,
});

export const errorLogout = () => ({
  type: ERROR_LOGOUT,
});