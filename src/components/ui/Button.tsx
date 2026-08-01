type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white shadow hover:bg-violet-700 transition"
    >
      {children}
    </button>
  );
}