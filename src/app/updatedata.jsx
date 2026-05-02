"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User, Image as ImageIcon } from "lucide-react";
import { UpdataData } from "@/operation/update";


export default function UpdatePage({ data }) {
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    let imageUrl = data.image;

    // Upload image if new selected
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "data123");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dajfjrgut/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();

      if (!result.secure_url) {
        setMessage("Image upload failed");
        setLoading(false);
        return;
      }

      imageUrl = result.secure_url;
    }

    try {
      await UpdataData({
        id: data.id,
        name,
        email,
        password,
        image: imageUrl,
      });

      // optional message (won't show if redirect happens)
      setMessage("Updated successfully");

      router.push("/dasbord");
    } catch (err) {
      setMessage("Update failed");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">

      <div className="max-w-md w-full bg-white dark:bg-[#1a2230] p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
            <User size={24} />
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Update Profile
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Edit your account details
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="w-full pl-11 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full pl-11 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Password (optional)
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full pl-11 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                placeholder="Leave blank to keep same"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Image
            </label>

            <div className="relative">
              <ImageIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                className="w-full pl-11 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-primary hover:bg-red-600 disabled:opacity-50 text-white py-3.5 rounded-xl font-bold text-lg transition-all"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Go back to{" "}
          <Link href="/dasbord" className="text-primary hover:text-red-600 font-semibold">
            Dashboard
          </Link>
        </p>

      </div>
    </div>
  );
}