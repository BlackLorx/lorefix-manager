import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white shadow transition hover:bg-violet-700 ${className}`}
    >
      {children}
    </button>
  );
}