export const fetchStudents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: "Alice", course: "React", email: "alice@example.com" },
                { id: 2, name: "Bob", course: "Vue", email: "bob@example.com" },
                { id: 3, name: "Charlie", course: "React", email: "charlie@example.com" },
            ]);
        }, 1000);
    });
};