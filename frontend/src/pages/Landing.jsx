import SearchBar from "../components/SearchBar";
import TopBar from "../components/TopBar";
import UserBlogCard from "../components/UserBlogCard";
import useBlogs from "../utils/useBlog";
import Pagination from "../components/Pagination";

export default function Landing() {
  
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
  } = useBlogs();


  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopBar />

      <div className="max-w-3xl w-full mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">
          Explore Latest Blogs ✨
        </h1>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          isAdmin={false}
        />

        {loading ? (
          <p className="text-center text-indigo-500 animate-pulse">
            Loading blogs...
          </p>
        ) : error ? (
          <p className="text-center text-red-600 font-medium">{error}</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-600 italic">No blogs found.</p>
        ) : (
          <div className="space-y-4 mt-4">
            {blogs.map((blog) => (
              <UserBlogCard
                key={blog.id}
                blog={blog}
              />
            ))}
          </div>
        )}

        {blogs.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
