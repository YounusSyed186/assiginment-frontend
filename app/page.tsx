"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authAPI } from "./lib/api";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await authAPI.login(form);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-5">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-white/20">
        
        <h1 className="text-3xl font-extrabold text-white text-center mb-6">
          Welcome Back 👋
        </h1>

        <label className="text-white font-medium">Email</label>
        <input
          className="w-full border-none outline-none bg-white/20 text-white
                     placeholder-white/60 p-3 rounded-lg my-2 focus:ring-2 
                     focus:ring-white/50"
          placeholder="Enter your email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label className="text-white font-medium">Password</label>
        <input
          className="w-full border-none outline-none bg-white/20 text-white
                     placeholder-white/60 p-3 rounded-lg my-2 focus:ring-2 
                     focus:ring-white/50"
          placeholder="Enter your password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full mt-4 bg-white text-blue-700 font-bold py-3 rounded-lg
                     shadow-md hover:bg-gray-200 active:scale-95 transition-all"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center text-white mt-4">
          No account?{" "}
          <a href="/register" className="font-semibold underline hover:text-gray-200">
            Register
          </a>
        </p>
      </div>
    </main>
  );
}
