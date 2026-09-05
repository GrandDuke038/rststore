import axios from "axios";
import { requestFail, requestStart, requestSuccess } from "./apiActions";

const runRequest = async (dispatch, key, request) => {
  dispatch(requestStart(key));
  try {
    const { data } = await request();
    dispatch(requestSuccess(key, data));
    return data;
  } catch (error) {
    dispatch(requestFail(key, error));
    throw error.response?.data || error;
  }
};

export const createTicket = (ticket) => (dispatch) =>
  runRequest(dispatch, "createTicket", () =>
    axios.post("/api/v1/support", ticket),
  );
export const getMyTickets =
  (params = {}) =>
  (dispatch) =>
    runRequest(dispatch, "myTickets", () =>
      axios.get("/api/v1/support/mine", { params }),
    );
export const getTicketById = (id) => (dispatch) =>
  runRequest(dispatch, "ticket", () => axios.get(`/api/v1/support/${id}`));
export const replyToTicket =
  ({ id, message }) =>
  (dispatch) =>
    runRequest(dispatch, "replyTicket", () =>
      axios.post(`/api/v1/support/${id}/replies`, { message }),
    );
export const getAllTickets =
  (params = {}) =>
  (dispatch) =>
    runRequest(dispatch, "tickets", () =>
      axios.get("/api/v1/support", { params }),
    );
export const updateTicketStatus =
  ({ id, status }) =>
  (dispatch) =>
    runRequest(dispatch, "ticketStatus", () =>
      axios.put(`/api/v1/support/${id}/status`, { status }),
    );
export const assignTicket =
  ({ id, assignedTo }) =>
  (dispatch) =>
    runRequest(dispatch, "ticketAssignment", () =>
      axios.put(`/api/v1/support/${id}/assign`, { assignedTo }),
    );
