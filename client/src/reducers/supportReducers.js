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

export const supportTicketCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SUPPORT_TICKET_CREATE_REQUEST:
      return { loading: true };
    case SUPPORT_TICKET_CREATE_SUCCESS:
      return { loading: false, success: true, ticket: action.payload };
    case SUPPORT_TICKET_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const supportMyTicketsReducer = (state = { tickets: {} }, action) => {
  switch (action.type) {
    case SUPPORT_MY_TICKETS_REQUEST:
      return { ...state, loading: true };
    case SUPPORT_MY_TICKETS_SUCCESS:
      return { loading: false, tickets: action.payload };
    case SUPPORT_MY_TICKETS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const supportTicketDetailsReducer = (
  state = { ticket: null },
  action,
) => {
  switch (action.type) {
    case SUPPORT_TICKET_DETAILS_REQUEST:
      return { ...state, loading: true };
    case SUPPORT_TICKET_DETAILS_SUCCESS:
      return { loading: false, ticket: action.payload };
    case SUPPORT_TICKET_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const supportTicketsListReducer = (state = { tickets: {} }, action) => {
  switch (action.type) {
    case SUPPORT_TICKETS_LIST_REQUEST:
      return { ...state, loading: true };
    case SUPPORT_TICKETS_LIST_SUCCESS:
      return { loading: false, tickets: action.payload };
    case SUPPORT_TICKETS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const supportTicketReplyReducer = (state = {}, action) => {
  switch (action.type) {
    case SUPPORT_TICKET_REPLY_REQUEST:
      return { loading: true };
    case SUPPORT_TICKET_REPLY_SUCCESS:
      return { loading: false, success: true, ticket: action.payload };
    case SUPPORT_TICKET_REPLY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const supportTicketStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case SUPPORT_TICKET_STATUS_REQUEST:
      return { loading: true };
    case SUPPORT_TICKET_STATUS_SUCCESS:
      return { loading: false, success: true, ticket: action.payload };
    case SUPPORT_TICKET_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const supportTicketAssignReducer = (state = {}, action) => {
  switch (action.type) {
    case SUPPORT_TICKET_ASSIGN_REQUEST:
      return { loading: true };
    case SUPPORT_TICKET_ASSIGN_SUCCESS:
      return { loading: false, success: true, ticket: action.payload };
    case SUPPORT_TICKET_ASSIGN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
