import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import fetcher from "../utils/fetcher";
import TopBar from "../components/TopBar";

export default function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetcher(`/api/blog/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (res.success) {
          setBlog(res.data);
          setError("");
        } else {
          setError(res.message || "Failed to load blog");
        }
      } catch {
        setError("Something went wrong while fetching blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <>
        <TopBar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-gray-500">Loading blog...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <TopBar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-red-600">{error}</p>
        </div>
      </>
    );
  }

  if (!blog) return null;

  const formattedDate = new Date(blog.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <TopBar />

      <main className="max-w-3xl mx-auto px-6 py-10 mt-10 mb-16">
        <div className="bg-white shadow-md rounded-xl p-6 sm:p-10 space-y-6 border border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span>
              By{" "}
              <strong className="text-black">
                {blog.author?.name || "Unknown"}
              </strong>
            </span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>

          <div className="text-base sm:text-[1.05rem] text-gray-800 whitespace-pre-wrap leading-relaxed">
            {blog.content}
          </div>

          <div className="pt-4">
            <Link
              to="/"
              className="inline-block px-4 py-2 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-900 transition">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
