import { useNavigate } from "react-router-dom";

const UserBlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const { title, content, createdAt } = blog;

  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="border rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-102 transition-shadow duration-200 bg-white"
      onClick={() =>navigate(`/blog/${blog.id}`)}>
      <h2 className="text-xl font-semibold mb-2 text-gray-900">{title}</h2>

      <p className="whitespace-pre-wrap text-gray-700 mb-3 line-clamp-2">
        {content}
      </p>

      <div className="text-sm text-gray-500">
        <span>Published on: {formattedDate}</span>
      </div>
    </div>
  );
};

export default UserBlogCard;
