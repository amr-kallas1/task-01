import { Moon, SunMedium } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Button
      variant="primary"
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 dark:bg-inherit dark:text-white text-black rounded transition-colors"
    >
      {darkMode ? <SunMedium /> : <Moon />}
    </Button>
  );
}
