'use client';

import { useEffect, useState } from "react";
import StudentList from "./components/StudentList";
import FilterBar from "./components/FilterBar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export default function HomePage() {
    const [students, setStudents] = useState<any[]>([]);
    const [filtered, setFiltered] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
          router.push("/signin");
        }
    }, [user, loading]);

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDocs(collection(db, "students"));
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStudents(data);
            setFiltered(data);
        };
        fetchData();
    }, []);

    const handleFilter = (course: string) => {
        const filteredByCourse = course ? students.filter(s => s.course === course) : students;
        const searched = search
            ? filteredByCourse.filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
            : filteredByCourse;
        setFiltered(searched);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearch(term);
        const searched = term
            ? students.filter(s => s.name.toLowerCase().includes(term.toLowerCase()))
            : students;
        setFiltered(searched);
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/signin");
    };

  return (
        <main className="min-h-screen bg-gradient-to-tr from-blue-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
                        🎓 Student Dashboard
                    </h1>
                    <div className="flex gap-4">
                        <Link href="/add">
                            <button className="bg-indigo-600 text-white px-4 py-3 rounded-md hover:bg-indigo-700 transition cursor-pointer">
                                ➕ Add Student
                            </button>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 transition border border-red-300 cursor-pointer"
                        >
                            🚪 Logout
                        </button>
                    </div>
                </div>

                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="relative w-full">
                        <FilterBar onFilter={handleFilter} />
                    </div>
                    <div className="relative w-full">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</span>
                        <input
                            type="text"
                            placeholder="Search students by name..."
                            value={search}
                            onChange={handleSearch}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>
                </div>



                <div className="mt-4">
                    <StudentList students={filtered} />
                </div>
            </div>
            <Toaster position="top-right" />
        </main>
    );
}
