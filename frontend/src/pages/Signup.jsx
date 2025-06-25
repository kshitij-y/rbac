import { useState } from "react";
import toast from "react-hot-toast";
import TopBar from "../components/TopBar";
import fetcher from "../utils/fetcher";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    role: "USER",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOTP = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!emailRegex.test(form.email)) {
      toast.error("Invalid email format");
      return;
    }
    try {
      const response = await fetcher("/api/auth/verifyEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      if (!response.success) {
        toast.error("Failed to send OTP. Please try again.");
        return;
      }
      toast.success("OTP sent to your email");
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
    
  };

  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!emailRegex.test(form.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!form.otp.trim()) {
      toast.error("OTP is required");
      return;
    }

    if (!form.password.trim()) {
      toast.error("Password is required");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!form.confirmPassword.trim()) {
      toast.error("Please confirm your password");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetcher("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          otp: form.otp,
          Role: form.role,
        }),
      });
      console.log("Signup response:", response);

      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success("Signup successful!");
      navigate("/");
      
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Signup failed. Please try again.");
      return;
    }

    toast.success("Signup successful!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      <TopBar />
      <div className="mt-16 w-full max-w-md border border-gray-300 rounded-xl shadow-lg p-8 ">
        <h2 className="text-2xl font-semibold mb-6 text-black text-center">
          Create Account
        </h2>

        <div className="flex flex-col gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border border-gray-400 rounded-lg px-3 py-2 text-black bg-transparent"
          />

          <div className="flex gap-2 items-center">
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="flex-1 border border-gray-400 rounded-lg px-3 py-2 text-black bg-transparent"
            />
            <button
              onClick={handleSendOTP}
              className="text-white border bg-gray-600  border-gray-400 rounded-lg px-4 py-2 hover:scale-105 transition">
              Send OTP
            </button>
          </div>

          <input
            name="otp"
            value={form.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
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

          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="border border-gray-400 rounded-lg px-3 py-2 text-black bg-transparent"
          />


          <div className="flex items-center gap-6 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="USER"
                checked={form.role === "USER"}
                onChange={handleChange}
                className="accent-black"
              />
              <span className="text-black">User</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="ADMIN"
                checked={form.role === "ADMIN"}
                onChange={handleChange}
                className="accent-black"
              />
              <span className="text-black">Admin</span>
            </label>
          </div>

          <button
            onClick={handleSignup}
            className="bg-black text-white rounded-lg px-4 py-2 mt-4 hover:scale-105 transition">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
