'use client';

import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  const handleSignup = async () => {
    const userCred = await createUserWithEmailAndPassword(email, password);
    if (userCred) {
      await sendEmailVerification();
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-indigo-100 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">
            ✨ Create Account
        </h2>
        <label className="block mb-2 text-sm font-medium text-gray-700">📧 Email</label>
        <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">🔐 Password</label>
        <input
            type="password"
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-md p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button
            onClick={handleSignup}
            className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 cursor-pointer transition"
        >
          Sign Up
        </button>

        {error && (
            <p className="mt-4 text-sm text-red-600 text-center">{error.message}</p>
        )}

        <p className="mt-6 text-sm text-center text-gray-600">
        Already have an account?{" "}
            <a
                href="/signin"
                className="text-indigo-600 font-semibold hover:underline"
            >
                Sign In
            </a>
        </p>
      </div>
    </div>
  );
}
