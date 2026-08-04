import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../theme/Theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-3 rounded-xl border px-4 py-3 transition hover:bg-gray-100"
    >
      {theme === "light" ? (
        <>
          <Moon size={20} />
          <span>Modo oscuro</span>
        </>
      ) : (
        <>
          <Sun size={20} />
          <span>Modo claro</span>
        </>
      )}
    </button>
  );
}