"use client";
import LoginAcc from "@/actions/login";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function HandleSubmit(e) {
    e.preventDefault();

    const res = await LoginAcc({ email, password });
    setMessage(res.error || res.success);

    setEmail("");
    setPassword("");
  }

  return (
    <main>
      <div className="flex items-center justify-center h-screen bg-[#8A2BE2]">
        <form
          onSubmit={HandleSubmit}
          className="bg-white p-6 rounded-lg shadow w-80 space-y-4"
        >
          <h2 className="text-lg font-semibold text-center text-gray-800">
            Login
          </h2>

          <p className="text-sm text-gray-500 text-center">
            Enter your credentials to access your account
          </p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full p-2 border rounded bg-black text-white"
          >
            Login
          </button>

          {/* Message at bottom */}
          {message && (
            <p className="text-center text-sm text-red-500">
              {message}
            </p>
          )}

          {/* Signup link */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="signin" className="text-blue-600 hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}