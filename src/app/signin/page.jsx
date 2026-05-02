"use client";

import SignUp from "@/actions/Signup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SigninPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter()

  async function HandleSubmit(e) {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "data123");
    formData.append("cloud_name", "dajfjrgut");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dajfjrgut/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!result.secure_url) {
      setMessage("Image upload failed");
      return;
    }

    const res = await SignUp({
      name,
      email,
      password,
      image: result.secure_url,
    });

    setMessage(res.error || res.success);

    setName("");
    setEmail("");
    setPassword("");
    setImage("");
   router.push("/login")
  }

  return (
    <main>
      <div className="flex items-center justify-center h-screen bg-[#8A2BE2]">
        <form
          onSubmit={HandleSubmit}
          className="bg-white p-6 rounded-lg shadow w-80 space-y-4"
        >
          <h2 className="text-lg font-semibold text-center text-gray-800">
            Create Account
          </h2>

          <p className="text-sm text-gray-500 text-center">
            Fill your details to create a new account
          </p>

          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
            required
            className="w-full p-2 border rounded"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
            className="w-full p-2 border rounded"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
          />

          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            required
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full p-2 bg-black text-white rounded"
          >
            Sign Up
          </button>

          
          {message && (
            <p className="text-center text-sm text-red-500">{message}</p>
          )}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}