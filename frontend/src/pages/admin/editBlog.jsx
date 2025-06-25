import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import fetcher from "../../utils/fetcher";
import TopBar from "../../components/TopBar";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetcher(`/api/blog/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (res.success) {
          setForm({
            title: res.data.title,
            content: res.data.content,
          });
        } else {
          toast.error(res.message || "Failed to load blog");
        }
      } catch (err) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      const res = await fetcher(`/api/blog/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (res.success) {
        toast.success("Blog updated!");
        navigate("/admin");
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopBar />
      <main className="flex-grow flex items-start justify-center py-10">
        {loading ? (
          <p className="text-gray-500 text-center">Loading blog data...</p>
        ) : (
          <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">
              Edit Blog
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
              />
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Update your blog content..."
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-transform transform hover:scale-105">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
