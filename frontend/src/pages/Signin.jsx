import { useState } from "react";
import toast from "react-hot-toast";
import TopBar from "../components/TopBar";
import fetcher from "../utils/fetcher";
import { useNavigate } from "react-router-dom";
export default function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!emailRegex.test(form.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!form.password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      const response = await fetcher("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (!response.success) {
        toast.error(response.message || "Signin failed");
        return;
      }

      toast.success("Signin successful!");
      navigate("/");
      
    } catch (err) {
      console.error("Signin error:", err);
      toast.error("Signin failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      <TopBar />
      <div className="flex items-center justify-center w-full mt-16 gap-4">
        <div className="w-2xl">
          <img src="/auth.jpg" alt="Auth Image" />
        </div>
        <div className="flex items-center justify-center w-md">
          <div className="w-full max-w-md border border-gray-300 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-black text-center">
              Sign In
            </h2>

            <div className="flex flex-col gap-4">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="border border-gray-400 rounded-lg px-3 py-2 text-black bg-transparent"
              />

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="border border-gray-400 rounded-lg px-3 py-2 text-black bg-transparent"
              />

              <button
                onClick={handleSignin}
                className="bg-black text-white rounded-lg px-4 py-2 mt-4 hover:scale-105 transition">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
