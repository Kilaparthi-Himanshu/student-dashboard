'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

export default function AddStudentPage() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', course: '' });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { name, email, course } = form;

    if (!name || !email || !course || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        toast.error("Please fill all fields with a valid email.");
        return;
    }

        try {
            await addDoc(collection(db, "students"), {
                ...form,
                createdBy: user?.email,
                createdAt: new Date()
            });
            toast.success("Student added successfully!");
            router.push("/");
        } catch (error) {
            toast.error("Error adding student");
            console.error(error);
        }
    };

    if (!user) {
        return <p className="p-6 text-center text-lg text-red-500 font-medium">🔒 You must be logged in to add a student.</p>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-tr from-white to-indigo-50 py-10 px-4">
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">➕ Add a New Student</h2>

            <label className="block mb-2 font-medium text-gray-700">👤 Name</label>
            <input
                name="name"
                placeholder="Enter full name"
                onChange={handleChange}
                className="w-full border px-4 py-2 mb-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <label className="block mb-2 font-medium text-gray-700">📧 Email</label>
            <input
                name="email"
                placeholder="Enter email address"
                onChange={handleChange}
                className="w-full border px-4 py-2 mb-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <label className="block mb-2 font-medium text-gray-700">📚 Course</label>
            <input
                name="course"
                placeholder="Enter course name"
                onChange={handleChange}
                className="w-full border px-4 py-2 mb-6 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition font-semibold"
            >
                Add Student
            </button>
            </form>
        </div>
    );
}
