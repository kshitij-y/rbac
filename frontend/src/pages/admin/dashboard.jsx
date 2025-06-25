import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import BlogCard from "../../components/BlogCard";
import useBlogs from "../../utils/useBlog";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/pagination";
import useAuth from "../../utils/useAuth";

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

  const{ isAdmin }= useAuth();

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
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
    <>
      <div className="w-full">
        <TopBar />
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortOrder={sortOrder}
          isAdmin={isAdmin}
          onSortChange={setSortOrder}
        />

        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
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
    </>
  );
}
