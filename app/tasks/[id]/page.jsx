"use client";

import { useEffect, useState } from "react";
import { taskAPI } from "../../lib/api";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function EditTask() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState(null);

  useEffect(() => {
    taskAPI.get(id).then((res) => setForm(res.data));
  }, [id]);

  const update = async () => {
    try {
      const payload = {
        title: form.title,
        description: form.description,
        status: form.status,
      };

      await taskAPI.update(id, payload);

      toast.success("Updated!");
      router.push("/dashboard");
    } catch (err) {
      console.log("UPDATE ERROR:", err);
      toast.error("Error updating task");
    }
  };

  if (!form)
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading task...</p>
      </main>
    );

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-8 border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Task</h1>

        {/* Title */}
        <label className="text-gray-700 font-medium">Title</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-3 mt-1 mb-4 outline-none 
                     focus:ring-2 focus:ring-indigo-500 transition"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* Description */}
        <label className="text-gray-700 font-medium">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 mt-1 mb-4 outline-none 
                     h-28 resize-none focus:ring-2 focus:ring-indigo-500 transition"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>

        {/* Status */}
        <label className="text-gray-700 font-medium">Status</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-3 mt-1 mb-4 outline-none 
                     focus:ring-2 focus:ring-indigo-500 transition"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In-Progress</option>
          <option value="done">Done</option>
        </select>

        {/* Update Button */}
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold
                     hover:bg-blue-700 transition active:scale-95"
          onClick={update}
        >
          Update Task
        </button>
      </div>
    </main>
  );
}
