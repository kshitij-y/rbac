import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

const BlogCard = ({ blog, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { id, title, content, createdAt, author } = blog;

  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-2xl border p-5 bg-white shadow-md hover:shadow-xl hover:scale-103 transition-all duration-300">
      {/* Header - Author Info */}
      <div className="flex items-center gap-3 mb-4">
        <UserCircle className="text-gray-600" size={32} />
        <div>
          <p className="font-medium text-gray-900">{author?.name}</p>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>

      <h2
        onClick={() => navigate(`/blog/${blog.id}`)}
        className="text-lg font-semibold text-blue-700 mb-2 cursor-pointer hover:underline">
        {title}
      </h2>

      <p
        onClick={() => navigate(`/blog/${blog.id}`)}
        className="text-gray-700 text-sm whitespace-pre-wrap line-clamp-2 cursor-pointer mb-4">
        {content}
      </p>

      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => onEdit(id)}
          className="px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all">
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="px-4 py-1 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-all">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
