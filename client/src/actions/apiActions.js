export const API_REQUEST = "API_REQUEST";
export const API_SUCCESS = "API_SUCCESS";
export const API_FAIL = "API_FAIL";

export const requestStart = (key) => ({ type: API_REQUEST, payload: key });
export const requestSuccess = (key, data) => ({
  type: API_SUCCESS,
  payload: { key, data },
});
export const requestFail = (key, error) => ({
  type: API_FAIL,
  payload: {
    key,
    error: {
      data: error.response?.data,
      error: error.message,
      message: error.response?.data?.message || error.message,
    },
  },
});
