import axios from "axios";
import * as types from "../constants/supportConstants";

const errorMessage = (error) => error.response?.data?.message || error.message;

const runRequest = async (dispatch, requestType, successType, failType, request) => {
  dispatch({ type: requestType });
  try {
    const { data } = await request();
    dispatch({ type: successType, payload: data });
    return data;
  } catch (error) {
    dispatch({ type: failType, payload: errorMessage(error) });
    throw error;
  }
};

export const createTicket = (ticket) => (dispatch) =>
  runRequest(dispatch, types.SUPPORT_TICKET_CREATE_REQUEST, types.SUPPORT_TICKET_CREATE_SUCCESS, types.SUPPORT_TICKET_CREATE_FAIL, () =>
    axios.post("/api/v1/support", ticket),
  );
export const getMyTickets =
  (params = {}) =>
  (dispatch) =>
    runRequest(dispatch, types.SUPPORT_MY_TICKETS_REQUEST, types.SUPPORT_MY_TICKETS_SUCCESS, types.SUPPORT_MY_TICKETS_FAIL, () =>
      axios.get("/api/v1/support/mine", { params }),
    );
export const getTicketById = (id) => (dispatch) =>
  runRequest(dispatch, types.SUPPORT_TICKET_DETAILS_REQUEST, types.SUPPORT_TICKET_DETAILS_SUCCESS, types.SUPPORT_TICKET_DETAILS_FAIL, () => axios.get(`/api/v1/support/${id}`));
export const replyToTicket =
  ({ id, message }) =>
  (dispatch) =>
    runRequest(dispatch, types.SUPPORT_TICKET_REPLY_REQUEST, types.SUPPORT_TICKET_REPLY_SUCCESS, types.SUPPORT_TICKET_REPLY_FAIL, () =>
      axios.post(`/api/v1/support/${id}/replies`, { message }),
    );
export const getAllTickets =
  (params = {}) =>
  (dispatch) =>
    runRequest(dispatch, types.SUPPORT_TICKETS_LIST_REQUEST, types.SUPPORT_TICKETS_LIST_SUCCESS, types.SUPPORT_TICKETS_LIST_FAIL, () =>
      axios.get("/api/v1/support", { params }),
    );
export const updateTicketStatus =
  ({ id, status }) =>
  (dispatch) =>
    runRequest(dispatch, types.SUPPORT_TICKET_STATUS_REQUEST, types.SUPPORT_TICKET_STATUS_SUCCESS, types.SUPPORT_TICKET_STATUS_FAIL, () =>
      axios.put(`/api/v1/support/${id}/status`, { status }),
    );
export const assignTicket =
  ({ id, assignedTo }) =>
  (dispatch) =>
    runRequest(dispatch, types.SUPPORT_TICKET_ASSIGN_REQUEST, types.SUPPORT_TICKET_ASSIGN_SUCCESS, types.SUPPORT_TICKET_ASSIGN_FAIL, () =>
      axios.put(`/api/v1/support/${id}/assign`, { assignedTo }),
    );
