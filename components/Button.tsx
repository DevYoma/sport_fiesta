'use client'

type prop = {
    children: React.ReactNode;
    className?: React.CSSProperties;
    onClick?: () => void;
    type?: "button" | "submit" | "reset"; // come back to this
}

const Button = ({ children, className, onClick }: prop) => {
  return (
    <button 
        className={`px-8 py-4 rounded-full cursor-pointer border border-gray-50 ${className}`}
        onClick={onClick}
    >
        {children}
    </button>
  )
}

export default Button