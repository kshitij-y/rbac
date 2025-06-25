import { useState, useEffect } from "react";
import fetcher from "../utils/fetcher";

export default function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const base = searchTerm.trim()
        ? `/api/blog/search?q=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`
        : `/api/blog/getAll?page=${page}&limit=${limit}`;

      const res = await fetcher(base, {
        method: "GET",
        credentials: "include",
      });

      if (res.success) {
        let fetchedBlogs = res.data.blogs;

        fetchedBlogs.sort((a, b) =>
          sortOrder === "newest"
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : new Date(a.createdAt) - new Date(b.createdAt)
        );

        setBlogs(fetchedBlogs);
        setTotalPages(res.data.totalPages);
        setError(null);
      } else {
        setError(res.message || "Failed to fetch blogs");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, searchTerm, sortOrder]);

  return {
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
  };
}
