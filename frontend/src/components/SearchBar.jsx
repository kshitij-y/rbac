import { useNavigate } from "react-router-dom";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortChange,
  isAdmin,
}) => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/admin/createBlog");
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6">
      <input
        type="search"
        placeholder="Search blogs..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-grow px-4 py-2 border rounded-lg mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-between items-center space-x-4 w-full sm:w-auto">
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        {isAdmin && (
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-black text-white rounded-md cursor-pointer hover:bg-gray-900 transition">
            + New Blog
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
