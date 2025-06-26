import { useEffect, useState } from "react";
import fetcher from "../utils/fetcher";
import TopBar from "../components/TopBar";
import toast from "react-hot-toast";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetcher("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (res.success) {
          setProfile(res.data);
        } else {
            toast.error(res.message || "Failed to load profile");
        }
      } catch (err) {
        toast.error(res.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <>
        <TopBar />
        <div className="flex justify-center items-center min-h-[100vh]">
          <p className="text-indigo-500 font-semibold animate-pulse">
            Loading profile...
          </p>
        </div>
      </>
    );
  }


  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <TopBar />
      <main className="max-w-md mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-12 border border-indigo-200">
        <h1 className="text-4xl font-extrabold mb-8 text-indigo-700 tracking-wide">
          Your Profile
        </h1>

        <div className="space-y-6 text-gray-700">
          <div className="bg-indigo-100 p-4 rounded-lg shadow-inner">
            <label className="font-semibold text-indigo-800">Name:</label>
            <p className="mt-1 text-indigo-900">{profile.name || "N/A"}</p>
          </div>

          <div className="bg-pink-100 p-4 rounded-lg shadow-inner">
            <label className="font-semibold text-pink-700">Email:</label>
            <p className="mt-1 text-pink-900">{profile.email || "N/A"}</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg shadow-inner">
            <label className="font-semibold text-green-800">Role:</label>
            <p className="mt-1 text-green-900 capitalize">
              {profile.role || "User"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
