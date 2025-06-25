import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const WARM_BG = "bg-[#fff8dc]";
const COOL_BG = "bg-white";

const ThemeToggle = () => {
  const [isWarm, setIsWarm] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const warm = storedTheme === "warm";
    setIsWarm(warm);
    document.body.classList.add(warm ? WARM_BG : COOL_BG);
  }, []);

  const toggleTheme = () => {
    const newMode = !isWarm;
    setIsWarm(newMode);

    document.body.classList.remove(WARM_BG, COOL_BG);
    document.body.classList.add(newMode ? WARM_BG : COOL_BG);
    localStorage.setItem("theme", newMode ? "warm" : "day");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 shadow-sm group">
      <span className="transition-transform duration-300 group-hover:scale-110 text-yellow-500">
        {isWarm ? <Sun size={20} /> : <Moon size={20} />}
      </span>
      <span className="hidden sm:block text-sm font-medium text-gray-700">
        {isWarm ? "day" : "warm"}
      </span>
    </button>
  );
};

export default ThemeToggle;
