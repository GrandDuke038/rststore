import axios from "axios";

import {
  SUPPORT_MY_TICKETS_FAIL,
  SUPPORT_MY_TICKETS_REQUEST,
  SUPPORT_MY_TICKETS_SUCCESS,
  SUPPORT_TICKET_ASSIGN_FAIL,
  SUPPORT_TICKET_ASSIGN_REQUEST,
  SUPPORT_TICKET_ASSIGN_SUCCESS,
  SUPPORT_TICKET_CREATE_FAIL,
  SUPPORT_TICKET_CREATE_REQUEST,
  SUPPORT_TICKET_CREATE_SUCCESS,
  SUPPORT_TICKET_DETAILS_FAIL,
  SUPPORT_TICKET_DETAILS_REQUEST,
  SUPPORT_TICKET_DETAILS_SUCCESS,
  SUPPORT_TICKET_REPLY_FAIL,
  SUPPORT_TICKET_REPLY_REQUEST,
  SUPPORT_TICKET_REPLY_SUCCESS,
  SUPPORT_TICKET_STATUS_FAIL,
  SUPPORT_TICKET_STATUS_REQUEST,
  SUPPORT_TICKET_STATUS_SUCCESS,
  SUPPORT_TICKETS_LIST_FAIL,
  SUPPORT_TICKETS_LIST_REQUEST,
  SUPPORT_TICKETS_LIST_SUCCESS,
} from "../constants/supportConstants";

export const createTicket = (ticket) => async (dispatch, getState) => {
  try {
    dispatch({ type: SUPPORT_TICKET_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.post("/api/v1/support", ticket, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: SUPPORT_TICKET_CREATE_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({
      type: SUPPORT_TICKET_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyTickets =
  (params = {}) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SUPPORT_MY_TICKETS_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const { data } = await axios.get("/api/v1/support/mine", {
        headers: { Authorization: `Bearer ${userInfo.token}` },
        params,
      });
      dispatch({ type: SUPPORT_MY_TICKETS_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: SUPPORT_MY_TICKETS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getTicketById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: SUPPORT_TICKET_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.get(`/api/v1/support/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: SUPPORT_TICKET_DETAILS_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({
      type: SUPPORT_TICKET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const replyToTicket =
  ({ id, message }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SUPPORT_TICKET_REPLY_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const { data } = await axios.post(
        `/api/v1/support/${id}/replies`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        },
      );
      dispatch({ type: SUPPORT_TICKET_REPLY_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: SUPPORT_TICKET_REPLY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAllTickets =
  (params = {}) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SUPPORT_TICKETS_LIST_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const { data } = await axios.get("/api/v1/support", {
        headers: { Authorization: `Bearer ${userInfo.token}` },
        params,
      });
      dispatch({ type: SUPPORT_TICKETS_LIST_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: SUPPORT_TICKETS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateTicketStatus =
  ({ id, status }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SUPPORT_TICKET_STATUS_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const { data } = await axios.put(
        `/api/v1/support/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        },
      );
      dispatch({ type: SUPPORT_TICKET_STATUS_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: SUPPORT_TICKET_STATUS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const assignTicket =
  ({ id, assignedTo }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SUPPORT_TICKET_ASSIGN_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const { data } = await axios.put(
        `/api/v1/support/${id}/assign`,
        { assignedTo },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        },
      );
      dispatch({ type: SUPPORT_TICKET_ASSIGN_SUCCESS, payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: SUPPORT_TICKET_ASSIGN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
