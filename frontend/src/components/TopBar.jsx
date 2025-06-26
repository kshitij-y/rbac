import AuthButtons from "./authButtons";
import ThemeToggle from "./toggleTheme";
import { useNavigate } from "react-router-dom";
export default function TopBar() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between p-4 w-full border-b border-gray-200 bg-white shadow-md">
      <div
        className="text-lg font-bold text-gray-800 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}>
        <h2 className="text-2xl font-bold">
          <span className="text-blue-700">write</span>Flow
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        {/* <ThemeToggle /> */}
        <AuthButtons />
      </div>
    </div>
  );
}
