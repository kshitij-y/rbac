import { useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";
import fetcher from "../utils/fetcher";
import toast from "react-hot-toast";
const AuthButtons = () => {
  const navigate = useNavigate();
  const {loggedIn, isAdmin} = useAuth();

  const handleSignOut = async () => {
    try {
      const res = await fetcher("/api/auth/signout", {
        method: "GET",
        credentials: "include",
      });
      if (res.success) {
        toast.success("Signed out successfully!");
      }
      navigate(0);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const handleSignIn = () => {
    navigate("/auth/signin");
  };

  const handleSignUp = () => {
    navigate("/auth/signup");
  };

  const goToAdmin = () => {
    navigate("/admin");
  }

  return (
    <div className="flex items-center gap-2">
      {loggedIn ? (
        <>
          {isAdmin && (
            <div
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg shadow hover:bg-green-100 transition-all duration-200 cursor-pointer"
              onClick={goToAdmin}>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-black">admin</span>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="px-4 py-1.5 text-sm font-medium text-white bg-black rounded-lg shadow hover:bg-gray-900 transition-all duration-200">
            Sign Out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleSignIn}
            className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-colors duration-200">
            Sign In
          </button>
          <button
            onClick={handleSignUp}
            className="px-4 py-1.5 text-sm font-medium text-white bg-black rounded-lg shadow hover:bg-gray-900 transition-all duration-200">
            Sign Up
          </button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
