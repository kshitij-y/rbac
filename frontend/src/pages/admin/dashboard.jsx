import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import BlogCard from "../../components/BlogCard";
import useBlogs from "../../utils/useBlog";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import useAuth from "../../utils/useAuth";
import fetcher from "../../utils/fetcher";

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    blogs,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    page,
    setPage,
    totalPages,
    setBlogs,
  } = useBlogs();

  const { isAdmin } = useAuth();

  const handleEdit = (id) => {
    navigate(`/admin/editBlog/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetcher(`/api/blog/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.success) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        console.error(res.message || "Failed to delete blog");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <TopBar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800 text-center">
          Admin Dashboard 🛠️
        </h1>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortOrder={sortOrder}
          isAdmin={isAdmin}
          onSortChange={setSortOrder}
          onCreate={() => navigate("/admin/createBlog")}
        />

        {loading ? (
          <p className="text-center text-indigo-600 animate-pulse">
            Loading blogs...
          </p>
        ) : error ? (
          <p className="text-center text-red-600 font-medium">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-600 italic">No blogs found.</p>
        ) : (
          <div className="space-y-6 pb-10">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
