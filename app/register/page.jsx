"use client";

import { useState } from "react";
import { authAPI } from "../lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await authAPI.register(form);
      toast.success("Account created!");
      router.push("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-700 p-5">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-white/20">
        
        <h1 className="text-3xl font-extrabold text-white text-center mb-6">
          Create an Account ✨
        </h1>

        <label className="text-white font-medium">Name</label>
        <input
          className="w-full border-none outline-none bg-white/20 text-white
                     placeholder-white/60 p-3 rounded-lg my-2 focus:ring-2 
                     focus:ring-white/50"
          placeholder="Enter your name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label className="text-white font-medium">Email</label>
        <input
          type="email"
          className="w-full border-none outline-none bg-white/20 text-white
                     placeholder-white/60 p-3 rounded-lg my-2 focus:ring-2 
                     focus:ring-white/50"
          placeholder="Enter your email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label className="text-white font-medium">Password</label>
        <input
          type="password"
          className="w-full border-none outline-none bg-white/20 text-white
                     placeholder-white/60 p-3 rounded-lg my-2 focus:ring-2 
                     focus:ring-white/50"
          placeholder="Create a password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full mt-4 bg-white text-green-700 font-bold py-3 rounded-lg
                     shadow-md hover:bg-gray-200 active:scale-95 transition-all"
          onClick={handleRegister}
        >
          Create Account
        </button>

        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <a href="/" className="font-semibold underline hover:text-gray-200">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
