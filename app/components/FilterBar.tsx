'use client';

export default function FilterBar({ onFilter }: { onFilter: (course: string) => void }) {
    return (
        <select
            onChange={(e) => onFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
        >
            <option value="">🎓 All Courses</option>
            <option value="React">⚛️ React</option>
            <option value="Typescript">🟦 TypeScript</option>
            <option value="SQL">🗃️ SQL</option>
            <option value="Vue">🟩 Vue</option>
            <option value="DevOps">🚀 DevOps</option>
        </select>
    );
}
