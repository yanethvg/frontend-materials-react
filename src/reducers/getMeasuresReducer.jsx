import {
  START_GET_MEASURES,
  COMPLETE_GET_MEASURES,
  ERROR_GET_MEASURES,
  START_CREATE_MEASURE,
  COMPLETE_CREATE_MEASURE,
  ERROR_CREATE_MEASURE,
  START_UPDATE_MEASURE,
  COMPLETE_UPDATE_MEASURE,
  ERROR_UPDATE_MEASURE,
  START_DELETE_MEASURE,
  COMPLETE_DELETE_MEASURE,
  ERROR_DELETE_MEASURE,
} from "../types/measure";

const initialState = {
  unit_measures: [],
  error: null,
  loading: false,
  messageError: null,
  pages: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_GET_MEASURES:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case COMPLETE_GET_MEASURES:
      return {
        ...state,
        unit_measures: action.payload.data,
        error: null,
        loading: false,
        pages: action.payload.meta.last_page,
      };
    case ERROR_GET_MEASURES:
      return {
        ...state,
        unit_measures: [],
        error: null,
        loading: false,
        messageError: action.payload,
      };

    default:
      return state;
  }
}
