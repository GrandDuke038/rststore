import { SUPPORT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const supportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTicket: builder.mutation({
      query: (ticket) => ({ url: SUPPORT_URL, method: "POST", body: ticket }),
      invalidatesTags: ["Support"],
    }),
    getMyTickets: builder.query({
      query: (params = {}) => ({ url: `${SUPPORT_URL}/mine`, params }),
      providesTags: ["Support"],
    }),
    getTicketById: builder.query({
      query: (id) => ({ url: `${SUPPORT_URL}/${id}` }),
      providesTags: (result, error, id) => [{ type: "Support", id }],
    }),
    replyToTicket: builder.mutation({
      query: ({ id, message }) => ({
        url: `${SUPPORT_URL}/${id}/replies`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: (result, error, { id }) => [
        "Support",
        { type: "Support", id },
      ],
    }),
    getAllTickets: builder.query({
      query: (params = {}) => ({ url: SUPPORT_URL, params }),
      providesTags: ["Support"],
    }),
    updateTicketStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${SUPPORT_URL}/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        "Support",
        { type: "Support", id },
      ],
    }),
    assignTicket: builder.mutation({
      query: ({ id, assignedTo }) => ({
        url: `${SUPPORT_URL}/${id}/assign`,
        method: "PUT",
        body: { assignedTo },
      }),
      invalidatesTags: (result, error, { id }) => [
        "Support",
        { type: "Support", id },
      ],
    }),
  }),
});

export const {
  useAssignTicketMutation,
  useCreateTicketMutation,
  useGetAllTicketsQuery,
  useGetMyTicketsQuery,
  useGetTicketByIdQuery,
  useReplyToTicketMutation,
  useUpdateTicketStatusMutation,
} = supportApiSlice;
