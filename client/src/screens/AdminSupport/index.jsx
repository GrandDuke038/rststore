import { useState } from "react";
import { Link } from "react-router-dom";

import Alert from "@components/Alert";
import Loader from "@components/Loader";
import { useGetAllTicketsQuery } from "@slices/supportApiSlice";

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

const AdminSupportScreen = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
    priority: "",
  });
  const query = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value),
  );
  const { data, isLoading, error } = useGetAllTicketsQuery(query);
  const tickets = data?.tickets || [];
  const setFilter = (name, value) => setFilters({ ...filters, [name]: value }); //[name] is a computed property name

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Support Tickets
        </h1>
        <div className="mt-8 grid gap-3 rounded-xl bg-slate-50 p-4 md:grid-cols-4">
          <input
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
            placeholder="Search subject or message"
            className="rounded-md border-slate-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <select
            value={filters.status}
            onChange={(e) => setFilter("status", e.target.value)}
            className="rounded-md border-slate-300 text-sm"
          >
            <option value="">All statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item.replace("_", " ")}
              </option>
            ))}
          </select>
          <select
            value={filters.category}
            onChange={(e) => setFilter("category", e.target.value)}
            className="rounded-md border-slate-300 text-sm"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            value={filters.priority}
            onChange={(e) => setFilter("priority", e.target.value)}
            className="rounded-md border-slate-300 text-sm"
          >
            <option value="">All priorities</option>
            {priorities.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Alert type="error">{error?.data?.message || error?.message}</Alert>
        ) : tickets.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            No support tickets match these filters.
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-slate-600">
                <tr>
                  <th className="px-4 py-3">Ticket</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Assigned</th>
                  <th className="px-4 py-3">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {tickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td className="px-4 py-4">
                      <Link
                        to={`/admin/support/${ticket._id}`}
                        className="font-medium text-indigo-600 hover:text-indigo-800"
                      >
                        #{ticket._id.slice(-6)} · {ticket.subject}
                      </Link>
                      <p className="mt-1 capitalize text-xs text-slate-500">
                        {ticket.priority} priority
                      </p>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {ticket.user?.name}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {ticket.category}
                    </td>
                    <td className="px-4 py-4 capitalize text-slate-600">
                      {ticket.status.replace("_", " ")}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {ticket.assignedTo?.name || "Unassigned"}
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
      </div>
    </div>
  );
};

export default AdminSupportScreen;
