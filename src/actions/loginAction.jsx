import { START_LOGIN, COMPLETE_LOGIN,  ERROR_LOGIN } from "../types";
import {notify} from '../components/utils/Notify';

export function getLogin(user) {
    return (dispatch) => {
        dispatch(startLogin());
        // get auth api
        fetch(`http://localhost/api/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            if (response.errors) {
              notify(response.message, 'error');
              dispatch(errorLogin(response.errors));
            } else {
              notify('Login success', 'success');
              dispatch(completeLogin(response));
            }
        })
        .catch((error) => {
            dispatch(errorLogin(error));
        });
    };
}

export const startLogin = () => ({
  type: START_LOGIN,
});

export const completeLogin = (auth) => ({
  type: COMPLETE_LOGIN,
  payload: auth,
});

export const errorLogin = (error) => ({
  type: ERROR_LOGIN,
  payload: error,
});