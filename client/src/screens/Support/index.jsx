import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Alert from "@components/Alert";
import Loader from "@components/Loader";
import {
  useCreateTicketMutation,
  useGetMyTicketsQuery,
} from "@slices/supportApiSlice";

const categories = [
  "Order Issue",
  "Payment Issue",
  "Delivery Issue",
  "Product Issue",
  "Account Issue",
  "Technical Issue",
  "Other",
];
const statuses = ["open", "in_progress", "resolved", "closed"];
const priorities = ["low", "medium", "high"];

const badgeClass = (
  status, //object look up function
) =>
  ({
    open: "bg-blue-100 text-blue-800",
    in_progress: "bg-amber-100 text-amber-800",
    resolved: "bg-green-100 text-green-800",
    closed: "bg-gray-200 text-gray-700",
  })[status] || "bg-gray-100 text-gray-700";

const SupportScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    subject: "",
    category: categories[0],
    priority: "medium",
    message: "",
  });
  const { data, isLoading, error } = useGetMyTicketsQuery(
    status ? { status } : {},
  );
  const [createTicket, { isLoading: isCreating }] = useCreateTicketMutation();

  const tickets = data?.tickets || [];

  if (userInfo?.isAdmin === true) {
    return <Navigate to="/admin/support" replace />;
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!form.subject.trim() || !form.message.trim()) {
      toast.error("Please provide a subject and message");
      return;
    }

    try {
      await createTicket(form).unwrap();
      setForm({
        subject: "",
        category: categories[0],
        priority: "medium",
        message: "",
      });
      toast.success("Your support ticket has been submitted");
    } catch (requestError) {
      toast.error(requestError?.data?.message || requestError?.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Support Center
        </h1>
        <p className="mt-2 text-slate-600">
          Send a request to customer care and follow every response here.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          <form
            onSubmit={submitHandler}
            className="rounded-xl border border-slate-200 p-6 shadow-sm lg:col-span-2"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              Open a ticket
            </h2>
            <div className="mt-5 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Subject
                <input
                  required
                  maxLength="160"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Category
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    {categories.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-medium text-slate-700">
                  Priority
                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm({ ...form, priority: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    {priorities.map((item) => (
                      <option key={item} value={item}>
                        {item[0].toUpperCase() + item.slice(1)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block text-sm font-medium text-slate-700">
                How can we help?
                <textarea
                  required
                  maxLength="5000"
                  rows="6"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </label>
              <button
                disabled={isCreating}
                type="submit"
                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreating ? "Submitting..." : "Submit ticket"}
              </button>
            </div>
          </form>

          <section className="lg:col-span-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">
                Your ticket history
              </h2>
              <select
                aria-label="Filter tickets by status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-md border-slate-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">All statuses</option>
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Alert type="error">
                {error?.data?.message || error?.message}
              </Alert>
            ) : tickets.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
                No tickets found. Open a ticket when you need help.
              </div>
            ) : (
              <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50 text-left text-slate-600">
                    <tr>
                      <th className="px-4 py-3">Ticket</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {tickets.map((ticket) => (
                      <tr key={ticket._id}>
                        <td className="px-4 py-4">
                          <Link
                            to={`/support/${ticket._id}`}
                            className="font-medium text-indigo-600 hover:text-indigo-800"
                          >
                            #{ticket._id.slice(-6)} · {ticket.subject}
                          </Link>
                          <p className="mt-1 capitalize text-xs text-slate-500">
                            {ticket.priority} priority
                          </p>
                        </td>
                        <td className="px-4 py-4 text-slate-600">
                          {ticket.category}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass(ticket.status)}`}
                          >
                            {ticket.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-600">
                          {new Date(ticket.updatedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SupportScreen;
