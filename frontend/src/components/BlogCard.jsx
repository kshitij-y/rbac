import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { id, title, content, createdAt } = blog;

  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-102 transition-shadow duration-300 bg-white" onClick={() =>navigate(`/blog/${blog.id}`)}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="whitespace-pre-wrap text-gray-700 mb-4 line-clamp-2">
        {content}
      </p>
      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
        <span>Created on: {formattedDate}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(id)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
