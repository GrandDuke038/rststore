import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Alert from "@components/Alert";
import Loader from "@components/Loader";
import { setCredentials } from "@slices/authSlice";
import { useGetMyOrdersQuery } from "@slices/orderApiSlice";
import { useProfileMutation } from "@slices/userApiSlice";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const {
    data: orders,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const response = await updateProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(response));
        toast.success("Profile updated");
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Your Profile
        </h1>

        <form onSubmit={submitHandler}>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Update your personal information.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-full">
                <label
                  htmlFor="full-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="full-name"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="confirmPassword"
                    type="password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loadingUpdateProfile ? "Loading..." : "Update"}
            </button>
          </div>
        </form>

        <div className="mt-20 max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Order history
          </h1>
        </div>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Alert type="error">
            {errorOrders?.data?.message || errorOrders?.message}
          </Alert>
        ) : (
          <div className="mt-16">
            <h2 className="sr-only">Recent orders</h2>

            <div className="space-y-20">
              {orders?.map((order, i) => (
                <div key={order._id}>
                  <div className="rounded-lg bg-slate-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                    <dl className="flex flex-auto justify-between space-y-6 divide-y divide-slate-200 text-sm text-slate-600 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-full lg:flex-none lg:gap-x-8">
                      <div className="flex justify-between pt-6 sm:block sm:pt-0">
                        <dt className="font-medium text-slate-900">
                          <span className="opacity-50">#{i + 1}</span> &nbsp;
                          Order ID
                        </dt>
                        <dd className="sm:mt-1">{order._id}</dd>
                      </div>
                      <div className="flex justify-between sm:block">
                        <dt className="font-medium text-slate-900">
                          Date placed
                        </dt>
                        <dd className="sm:mt-1">
                          <time dateTime={order.createdAt}>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </time>
                        </dd>
                      </div>
                      <div className="flex justify-between pt-6 sm:block sm:pt-0">
                        <dt className="font-medium text-slate-900">
                          Delivered At
                        </dt>
                        <dd className="sm:mt-1">
                          {order.deliveredAt || "Pending Delivery"}
                        </dd>
                      </div>
                      <div className="flex justify-between pt-6 font-medium text-slate-900 sm:block sm:pt-0">
                        <dt>Total amount</dt>
                        <dd className="sm:mt-1">₹{order.totalPrice}</dd>
                      </div>

                      <Link
                        to={`/order/${order._id}`}
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                      >
                        View Order Details
                      </Link>
                    </dl>
                  </div>

                  <table className="mt-4 w-full text-slate-500 sm:mt-6">
                    <caption className="sr-only">Products</caption>
                    <thead className="sr-only text-left text-sm text-slate-500 sm:not-sr-only">
                      <tr>
                        <th
                          scope="col"
                          className="py-2 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="hidden w-1/5 py-2 pr-8 font-normal sm:table-cell"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="hidden w-1/5 py-2 pr-8 font-normal sm:table-cell"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="w-0 py-2 text-right font-normal"
                        >
                          <span className="sr-only">Info</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 border-b border-slate-200 text-sm sm:border-t">
                      {order?.orderItems?.map((item) => (
                        <tr key={item.product}>
                          <td className="py-3 pr-8">
                            <div className="flex items-center">
                              <img
                                alt={item.src}
                                src={item.image}
                                className="mr-6 h-16 w-16 rounded object-cover object-center"
                              />
                              <div>
                                <div className="font-medium text-slate-900">
                                  {item.name}
                                </div>
                                <div className="mt-1 sm:hidden">
                                  ₹{item.price}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-3 pr-8 sm:table-cell">
                            ₹{item.price}
                          </td>
                          <td className="hidden py-3 pr-8 sm:table-cell">
                            <strong>{item.qty}</strong> x ₹{item.price} = ₹
                            {item.qty * item.price}
                          </td>
                          <td className="whitespace-nowrap py-3 text-right font-medium">
                            <Link
                              to={`/product/${item.product}`}
                              className="text-indigo-600"
                            >
                              View
                              <span className="hidden lg:inline"> Item</span>
                              <span className="sr-only">, {item.name}</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
