import {
  API_FAIL,
  API_REQUEST,
  API_SUCCESS,
} from "../actions/apiActions";
const initialState = { requests: {} };
export default function apiReducer(state = initialState, action) {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        requests: {
          ...state.requests,
          [action.payload]: {
            ...state.requests[action.payload],
            isLoading: true,
            error: null,
          },
        },
      };
    case API_SUCCESS:
      return {
        ...state,
        requests: {
          ...state.requests,
          [action.payload.key]: {
            isLoading: false,
            data: action.payload.data,
            error: null,
          },
        },
      };
    case API_FAIL:
      return {
        ...state,
        requests: {
          ...state.requests,
          [action.payload.key]: {
            ...state.requests[action.payload.key],
            isLoading: false,
            error: action.payload.error,
          },
        },
      };
    default:
      return state;
  }
}
