import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Alert from "@components/Alert";
import Loader from "@components/Loader";
import {
  useAssignTicketMutation,
  useGetTicketByIdQuery,
  useReplyToTicketMutation,
  useUpdateTicketStatusMutation,
} from "@slices/supportApiSlice";
import { useGetUsersQuery } from "@slices/userApiSlice";

const statuses = ["open", "in_progress", "resolved", "closed"];
const statusClass = (status) => ({ open: "bg-blue-100 text-blue-800", in_progress: "bg-amber-100 text-amber-800", resolved: "bg-green-100 text-green-800", closed: "bg-gray-200 text-gray-700" })[status];

const SupportTicketScreen = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const isAdmin = userInfo?.isAdmin;
  const { data: ticket, isLoading, error } = useGetTicketByIdQuery(id);
  const { data: usersData } = useGetUsersQuery(1, { skip: !isAdmin });
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("");
  const [assignee, setAssignee] = useState("");
  const [replyToTicket, { isLoading: isReplying }] = useReplyToTicketMutation();
  const [updateTicketStatus, { isLoading: isUpdatingStatus }] = useUpdateTicketStatusMutation();
  const [assignTicket, { isLoading: isAssigning }] = useAssignTicketMutation();
  const admins = (usersData?.users || []).filter((user) => user.isAdmin);

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
      setAssignee(ticket.assignedTo?._id || "");
    }
  }, [ticket]);

  const replyHandler = async (event) => {
    event.preventDefault();
    if (!reply.trim()) return;
    try {
      await replyToTicket({ id, message: reply }).unwrap();
      setReply("");
      toast.success("Reply sent");
    } catch (requestError) {
      toast.error(requestError?.data?.message || requestError?.message);
    }
  };

  const statusHandler = async () => {
    try {
      await updateTicketStatus({ id, status }).unwrap();
      toast.success("Ticket status updated");
    } catch (requestError) {
      toast.error(requestError?.data?.message || requestError?.message);
    }
  };

  const assignmentHandler = async () => {
    try {
      await assignTicket({ id, assignedTo: assignee || null }).unwrap();
      toast.success("Ticket assignment updated");
    } catch (requestError) {
      toast.error(requestError?.data?.message || requestError?.message);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="mx-auto max-w-4xl px-4 pt-24"><Alert type="error">{error?.data?.message || error?.message}</Alert></div>;
  if (!ticket) return null;

  return <div className="bg-white"><div className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
    <Link to={isAdmin ? "/admin/support" : "/support"} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">← Back to tickets</Link>
    <div className="mt-5 rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm text-slate-500">Ticket #{ticket._id.slice(-6)}</p><h1 className="mt-1 text-2xl font-bold text-slate-900">{ticket.subject}</h1><p className="mt-2 text-sm text-slate-600">{ticket.category} · {ticket.priority} priority · Created {new Date(ticket.createdAt).toLocaleString()}</p></div><span className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${statusClass(ticket.status)}`}>{ticket.status.replace("_", " ")}</span></div>
      {isAdmin && <div className="mt-6 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2"><div><label className="block text-sm font-medium text-slate-700">Status</label><div className="mt-1 flex gap-2"><select value={status} onChange={(e) => setStatus(e.target.value)} className="min-w-0 flex-1 rounded-md border-slate-300 text-sm">{statuses.map((item) => <option key={item} value={item}>{item.replace("_", " ")}</option>)}</select><button onClick={statusHandler} disabled={isUpdatingStatus || status === ticket.status} className="rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50">Save</button></div></div><div><label className="block text-sm font-medium text-slate-700">Assign to</label><div className="mt-1 flex gap-2"><select value={assignee} onChange={(e) => setAssignee(e.target.value)} className="min-w-0 flex-1 rounded-md border-slate-300 text-sm"><option value="">Unassigned</option>{admins.map((admin) => <option key={admin._id} value={admin._id}>{admin.name}</option>)}</select><button onClick={assignmentHandler} disabled={isAssigning || assignee === (ticket.assignedTo?._id || "")} className="rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50">Save</button></div></div></div>}
    </div>
    <section className="mt-8"><h2 className="text-xl font-semibold text-slate-900">Conversation</h2><div className="mt-4 space-y-4"><article className="rounded-xl border border-slate-200 bg-slate-50 p-5"><div className="flex justify-between gap-4 text-sm"><span className="font-semibold text-slate-900">{ticket.user?.name}</span><time className="text-slate-500">{new Date(ticket.createdAt).toLocaleString()}</time></div><p className="mt-3 whitespace-pre-wrap text-slate-700">{ticket.message}</p></article>{ticket.replies.map((item) => <article key={item._id} className={`rounded-xl border p-5 ${item.sender?._id === ticket.user?._id ? "border-slate-200 bg-white" : "border-indigo-100 bg-indigo-50"}`}><div className="flex justify-between gap-4 text-sm"><span className="font-semibold text-slate-900">{item.sender?.name || "Support"}{item.sender?.isAdmin ? " · Support" : ""}</span><time className="text-slate-500">{new Date(item.createdAt).toLocaleString()}</time></div><p className="mt-3 whitespace-pre-wrap text-slate-700">{item.message}</p></article>)}</div></section>
    <form onSubmit={replyHandler} className="mt-8 rounded-xl border border-slate-200 p-5"><label htmlFor="ticket-reply" className="text-sm font-semibold text-slate-900">{isAdmin ? "Reply to customer" : "Add a reply"}</label><textarea id="ticket-reply" required maxLength="5000" rows="5" value={reply} onChange={(e) => setReply(e.target.value)} className="mt-2 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Write your message..." /><div className="mt-3 flex justify-end"><button disabled={isReplying || !reply.trim()} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60">{isReplying ? "Sending..." : "Send reply"}</button></div></form>
  </div></div>;
};

export default SupportTicketScreen;
