import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

const UserBlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const { id, title, content, createdAt, author } = blog;

  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      onClick={() => navigate(`/blog/${id}`)}
      className="rounded-2xl border p-5 bg-white shadow-md hover:shadow-xl hover:scale-103 transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-3 mb-4">
        <UserCircle className="text-gray-600" size={32} />
        <div>
          <p className="font-medium text-gray-900">{author?.name}</p>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-blue-700 mb-2 hover:underline">
        {title}
      </h2>

      <p className="text-sm text-gray-700 whitespace-pre-wrap line-clamp-3 mb-2">
        {content}
      </p>
    </div>
  );
};

export default UserBlogCard;
