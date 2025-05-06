'use client';

import { db } from "@/lib/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Student = {
    id: string;
    name: string;
    email: string;
    course: string;
};

export default function StudentList({ students }: { students: any[] }) {
    const [localStudents, setLocalStudents] = useState(students);
    const [editing, setEditing] = useState<Student | null>(null);
    const [form, setForm] = useState({ name: "", email: "", course: "" });

    useEffect(() => {
        setLocalStudents(students);
    }, [students]);

    const handleDelete = async (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this student?");
        if (!confirm) return;

        try {
            await deleteDoc(doc(db, "students", id));
            setLocalStudents(localStudents.filter(student => student.id !== id));
        } catch (err) {
            console.error("Failed to delete student:", err);
            toast.error("Error deleting student. Check console for details.");
        }
    };

    const openEditModal = (student: Student) => {
        setEditing(student);
        setForm({
          name: student.name,
          email: student.email,
          course: student.course
        });
      };
    
      const handleUpdate = async () => {
        if (!editing) return;
    
        try {
          await updateDoc(doc(db, "students", editing.id), form);
          setLocalStudents(prev =>
            prev.map(s => (s.id === editing.id ? { ...s, ...form } : s))
          );
          setEditing(null);
        } catch (err) {
          console.error("Failed to update student:", err);
          toast.success("Error updating student.");
        }
      };

  if (!localStudents.length)
    return (
      <p className="text-center text-gray-500 text-lg mt-6">
        😢 No students found.
      </p>
    );

    return (
        <>
            <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                {localStudents.map((student) => (
                <li
                    key={student.id}
                    className="border border-gray-200 bg-white p-5 rounded-xl shadow-sm hover:shadow-md hover:bg-indigo-50 transition duration-200 ease-in-out relative"
                >
                    <h3 className="text-xl font-bold text-indigo-700 mb-1">{student.name}</h3>
                    <p className="text-sm text-gray-700">
                    📧 <span className="font-medium">{student.email}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                    📚 <span className="font-medium">{student.course}</span>
                    </p>

                    <button
                    onClick={() => handleDelete(student.id)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
                    title="Delete student"
                    >
                        🗑️ Delete
                    </button>

                    <button
                        onClick={() => openEditModal(student)}
                        className="absolute top-3 right-20 text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                        title="Edit student"
                    >
                    ✏️ Edit
                    </button>
                </li>
                ))}
            </ul>
            {editing && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-2" onClick={() => setEditing(null)}>
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-bold text-indigo-700 mb-4">Edit Student</h2>
                        <input
                            className="w-full border px-4 py-2 mb-3 rounded"
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        <input
                            className="w-full border px-4 py-2 mb-3 rounded"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <input
                            className="w-full border px-4 py-2 mb-4 rounded"
                            placeholder="Course"
                            value={form.course}
                            onChange={(e) => setForm({ ...form, course: e.target.value })}
                        />
                        <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setEditing(null)}
                            className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdate}
                            className="px-4 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                        >
                            Save
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
