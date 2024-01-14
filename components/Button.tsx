'use client'
import { PropsWithChildren } from "react"

type prop = PropsWithChildren<{
    // children: React.ReactNode;
    className?: React.CSSProperties;
    onClick?: () => void;
    type?: "button" | "submit" | "reset"; // come back to this
    disabled?: boolean;
}>

const Button = ({ children, className, onClick, disabled }: prop) => {
  return (
    <button
      className={`px-8 py-4 rounded-full cursor-pointer border border-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={onClick}
    >
      {disabled ? "loading..." : children}
    </button>
  );
}

export default Button