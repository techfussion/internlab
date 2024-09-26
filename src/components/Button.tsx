import React from "react";

export interface ButtonProps {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    clear?: boolean;
    text: string;
    type?: "button" | "submit" | "reset";
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, startIcon, endIcon, type, clear }) => {
    return (
        <button className={`${clear ? 'text-textBlue1': 'bg-customBlue1 text-white'} text-xs py-2 px-5`} type={type} onClick={onClick}>{startIcon ? startIcon: ''}{text} {endIcon ? endIcon: ''}</button>
    )
}

export default Button;