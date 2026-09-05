import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import Alert from "@components/Alert";
import Loader from "@components/Loader";
import { deleteUser, listUsers } from "@actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const UserListScreen = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const request = useSelector((state) => state.userList);
  const deleteRequest = useSelector((state) => state.userDelete);
  const data = request;
  const error = request.error;
  const isLoading = request.loading;
  const users = data?.users || [];
  const loadingDelete = deleteRequest.loading;

  useEffect(() => {
    dispatch(listUsers(page));
  }, [dispatch, page]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await dispatch(deleteUser(id));
        toast.success("User deleted successfully");
        dispatch(listUsers(page));
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            All Users
          </h1>
        </div>

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
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Admin
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
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {user._id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="font-bold">{user.email}</span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.isAdmin ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-600" />
                          ) : (
                            ""
                          )}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <Link
                            to={`/admin/user/${user._id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(user._id)}
                            type="button"
                            className="ml-3 rounded bg-red-50 px-2 py-1 text-sm font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-50"
                          >
                            {loadingDelete ? "Loading..." : "Delete"}
                          </button>
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

export default UserListScreen;
