import * as types from "../constants/supportConstants";

const requestReducer = (requestType, successType, failType) => (state = {}, action) => {
  switch (action.type) {
    case requestType: return { loading: true };
    case successType: return { loading: false, success: true, data: action.payload };
    case failType: return { loading: false, error: action.payload };
    default: return state;
  }
};

export const supportTicketCreateReducer = requestReducer(types.SUPPORT_TICKET_CREATE_REQUEST, types.SUPPORT_TICKET_CREATE_SUCCESS, types.SUPPORT_TICKET_CREATE_FAIL);
export const supportMyTicketsReducer = requestReducer(types.SUPPORT_MY_TICKETS_REQUEST, types.SUPPORT_MY_TICKETS_SUCCESS, types.SUPPORT_MY_TICKETS_FAIL);
export const supportTicketDetailsReducer = requestReducer(types.SUPPORT_TICKET_DETAILS_REQUEST, types.SUPPORT_TICKET_DETAILS_SUCCESS, types.SUPPORT_TICKET_DETAILS_FAIL);
export const supportTicketsListReducer = requestReducer(types.SUPPORT_TICKETS_LIST_REQUEST, types.SUPPORT_TICKETS_LIST_SUCCESS, types.SUPPORT_TICKETS_LIST_FAIL);
export const supportTicketReplyReducer = requestReducer(types.SUPPORT_TICKET_REPLY_REQUEST, types.SUPPORT_TICKET_REPLY_SUCCESS, types.SUPPORT_TICKET_REPLY_FAIL);
export const supportTicketStatusReducer = requestReducer(types.SUPPORT_TICKET_STATUS_REQUEST, types.SUPPORT_TICKET_STATUS_SUCCESS, types.SUPPORT_TICKET_STATUS_FAIL);
export const supportTicketAssignReducer = requestReducer(types.SUPPORT_TICKET_ASSIGN_REQUEST, types.SUPPORT_TICKET_ASSIGN_SUCCESS, types.SUPPORT_TICKET_ASSIGN_FAIL);
