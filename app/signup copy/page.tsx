import { auth } from "../../lib/firebase";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword, useSendEmailVerification } from "react-firebase-hooks/auth";

export default function Page() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [createUser] = useCreateUserWithEmailAndPassword(auth);
    const [sendEmailVerification] = useSendEmailVerification(auth);

    const handleSignup = async () => {
        await createUser(email, password);
        await sendEmailVerification();
        router.push('/');
    }

    return (
        <div style={{ padding: "2rem" }}>
        <h2>Signup</h2>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", marginBottom: "1rem" }}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: "block", marginBottom: "1rem" }}
        />
        <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
}