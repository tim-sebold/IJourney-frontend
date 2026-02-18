import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

function Logout() {
    const handleLogout = async () => {
        await signOut(auth);
        alert("Logged out successfully!");
    };

    return (
        <button onClick={handleLogout} className="bg-gray-600 text-white px-4 py-2 rounded">
            Logout
        </button>
    );
};

export default Logout;