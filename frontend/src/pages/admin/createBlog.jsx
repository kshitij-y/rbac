import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import fetcher from "../../utils/fetcher";
import TopBar from "../../components/TopBar";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      toast.error("Title and content are required");
      return;
    }

    try {
      const res = await fetcher("/api/blog/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (res.success) {
        toast.success("Blog created!");
        navigate("/admin");
      } else {
        toast.error(res.message || "Failed to create blog");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <TopBar />

      <div className="relative h-[calc(100vh-64px)] flex justify-center items-center">
        <div className="absolute left-[5%] sm:left-[18%] top-[15%]  max-w-xl bg-white p-6 mr-4 border rounded-xl shadow-xl z-10">
          <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full px-4 py-2 border rounded-md"
            />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              rows={8}
              className="w-full px-4 py-2 border rounded-md"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 hover:scale-110 transition-transform duration-200">
              Publish
            </button>
          </form>
        </div>

        <img
          src="/create.svg"
          alt="Create Illustration"
          className="absolute right-[10%] bottom-[10%] w-[450px] max-w-full z-0 opacity-90"
        />
      </div>
    </div>
  );
};

export default CreateBlog;
