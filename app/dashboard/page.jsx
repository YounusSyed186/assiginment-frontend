"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { userAPI, taskAPI } from "../lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const [users, setUsers] = useState([]); // For admin
  const [tasks, setTasks] = useState([]); // For regular users
  const [loading, setLoading] = useState(true);

  // Load users with tasks (admin only)
  const loadUsers = async () => {
    try {
      const res = await userAPI.list(); // aggregated users with tasks
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users.");
    }
  };

  // Load tasks for regular users
  const loadTasks = async () => {
    try {
      const res = await taskAPI.list(); // returns only the user's tasks
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch tasks.");
    }
  };

  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      loadUsers().finally(() => setLoading(false));
    } else {
      loadTasks().finally(() => setLoading(false));
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (!user) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">Loading user...</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">Loading data...</p>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-semibold">
            {user.name[0].toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-700">{user.name}</span>
            <span className="text-sm text-gray-500">{user.role}</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Admin View */}
      {user.role === "admin" ? (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Users & Tasks</h2>
          <div className="space-y-6">
            {users.map((u) => (
              <div
                key={u._id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                {/* User info */}
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{u.name}</h3>
                    <p className="text-gray-500">{u.email}</p>
                    <p className="text-sm text-gray-600">Role: {u.role}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Tasks: {u.tasks?.length || 0}
                  </p>
                </div>

                {/* User tasks */}
                {(u.tasks || []).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    {(u.tasks || []).map((t) => (
                      <div
                        key={t._id}
                        className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                      >
                        <h4 className="font-semibold text-gray-800">{t.title}</h4>
                        <p className="text-gray-600 text-sm mb-1">{t.description || "No description"}</p>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-1
                            ${
                              t.status === "todo"
                                ? "bg-yellow-100 text-yellow-800"
                                : t.status === "in-progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                        >
                          {t.status}
                        </span>
                        <div className="flex justify-end gap-3 mt-2">
                          <Link
                            href={`/tasks/${t._id}`}
                            className="text-blue-600 font-medium hover:underline text-sm"
                          >
                            Edit
                          </Link>
                          <button
                            className="text-red-600 font-medium hover:underline text-sm"
                            onClick={async () => {
                              await taskAPI.delete(t._id);
                              toast.success("Deleted");
                              loadUsers();
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mt-2">No tasks assigned.</p>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : (
        // Regular user view
        <section>
          <div className="flex justify-end mb-6">
            <Link
              href="/tasks/create"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              + Create Task
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length > 0 ? (
              tasks.map((t) => (
                <div
                  key={t._id}
                  className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">{t.title}</h2>
                  <p className="text-gray-600 mb-3">{t.description || "No description"}</p>
                  <span
                    className={`inline-block px-2 py-1 text-sm font-medium rounded-full mb-3
                      ${
                        t.status === "todo"
                          ? "bg-yellow-100 text-yellow-800"
                          : t.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                  >
                    {t.status}
                  </span>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/tasks/${t._id}`}
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      className="text-red-600 font-medium hover:underline"
                      onClick={async () => {
                        await taskAPI.delete(t._id);
                        toast.success("Deleted");
                        loadTasks();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No tasks found. Create a new task to get started!
              </p>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
