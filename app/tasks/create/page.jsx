"use client";

import { useState } from "react";
import { taskAPI } from "../../lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateTask() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  const create = async () => {
    try {
      await taskAPI.create(form);
      toast.success("Task added!");
      router.push("/dashboard");
    } catch {
      toast.error("Error creating task");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-8 border border-gray-200">
        
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Create New Task
        </h1>

        {/* Title */}
        <label className="text-gray-700 font-medium">Title</label>
        <input
          className="w-full border border-gray-300 rounded-lg p-3 mt-1 mb-4 outline-none 
                     focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Enter task title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        {/* Description */}
        <label className="text-gray-700 font-medium">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 mt-1 mb-4 outline-none 
                     h-28 resize-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Enter task description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>

        {/* Status */}
        <label className="text-gray-700 font-medium">Status</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-3 mt-1 mb-4 outline-none 
                     focus:ring-2 focus:ring-indigo-500 transition"
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In-Progress</option>
          <option value="done">Done</option>
        </select>

        {/* Submit Button */}
        <button
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold
                     hover:bg-green-700 transition active:scale-95"
          onClick={create}
        >
          Submit
        </button>
      </div>
    </main>
  );
}
