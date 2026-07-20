import { Link } from "react-router-dom";

import Alert from "@components/Alert";
import Loader from "@components/Loader";
import { useGetOrdersQuery } from "@slices/orderApiSlice";
import { useState } from "react";

const OrderListScreen = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetOrdersQuery(page);
  const orders = data?.orders || [];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          All Orders
        </h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Alert type="error">{error?.data?.message || error?.message}</Alert>
        ) : (
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Total
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Paid
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Delivered
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Buttons</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {order._id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {order.user.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(order.createdAt).toUTCString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="font-bold">₹{order.totalPrice}</span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {order.isPaid ? (
                            <span className="font-semibold text-green-700">
                              Paid
                            </span>
                          ) : (
                            <span className="font-semibold text-red-700">
                              Not Paid
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {order.isDelivered ? (
                            <span className="font-semibold text-green-700">
                              Delivered
                            </span>
                          ) : (
                            <span className="font-semibold text-red-700">
                              Not Delivered
                            </span>
                          )}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <Link
                            to={`/order/${order._id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {data?.pages > 1 && (
          <div className="mt-6 flex justify-end gap-3">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} type="button">Previous</button>
            <button disabled={page === data.pages} onClick={() => setPage(page + 1)} type="button">Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderListScreen;
