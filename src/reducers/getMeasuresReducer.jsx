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
    case START_CREATE_MEASURE:
      return {
        ...state,
        error: null,
        loading: true,
        unit_measures: state.unit_measures,
      };
    case COMPLETE_CREATE_MEASURE:
      return {
        ...state,
        error: null,
        loading: false,
        unit_measures: [action.payload.data, ...state.unit_measures],
      };
    case ERROR_CREATE_MEASURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case START_UPDATE_MEASURE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case COMPLETE_UPDATE_MEASURE:
      return {
        ...state,
        error: null,
        loading: false,
        unit_measures: state.unit_measures.map((measure) =>
          measure.id === action.payload.data.id
            ? (measure = action.payload.data)
            : measure
        ),
      };
    case ERROR_UPDATE_MEASURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case START_DELETE_MEASURE:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case COMPLETE_DELETE_MEASURE:
      return {
        ...state,
        error: null,
        loading: false,
        unit_measures: state.unit_measures.filter(
          (measure) => measure.id !== action.payload.data.id
        ),
      };
    case ERROR_DELETE_MEASURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
