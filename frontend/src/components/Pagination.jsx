const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="max-w-3xl mx-auto flex justify-center space-x-2 mt-6 mb-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50">
        Prev
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded border ${
            page === i + 1
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300"
          }`}>
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50">
        Next
      </button>
    </div>
  );
};

export default Pagination;
