import {
    START_UPDATE_CATEGORY,
    COMPLETE_UPDATE_CATEGORY,
    ERROR_UPDATE_CATEGORY
} from "./../../types/category";
import {API_URL} from '../../config';
import {notify} from '../../components/utils/Notify';

  export function updateCategoryAction (id, category, token) {
    return dispatch => {
      dispatch(startUpdateCategory())
      // get auth api
      fetch(`${API_URL}/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (response) {
            if (response.errors) {
                notify(response.message, 'error');
                dispatch(errorUpdateCategory(response.errors))
                
              } else {
                notify('Updated category successfully', 'success');
                dispatch(completeUpdateCategory(response))
               
              }
        })
        .catch(error => {
            dispatch(errorUpdateCategory(error))
        })
    }
  }
  
  export const startUpdateCategory = () => ({
    type: START_UPDATE_CATEGORY
  })
  
  export const completeUpdateCategory = response => ({
    type: COMPLETE_UPDATE_CATEGORY,
    payload: response
  })
  
  export const errorUpdateCategory = (error) => ({
    type: ERROR_UPDATE_CATEGORY,
    payload: error,
  })