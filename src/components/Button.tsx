import React from "react";

export interface ButtonProps {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    clear?: boolean;
    fill?: string;
    color?: string;
    text: string;
    type?: "button" | "submit" | "reset";
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, startIcon, endIcon, type, clear, fill, color }) => {
    fill = fill ? fill : 'bg-customBlue1';
    color = color ? color : 'text-white';

    return (
        <button className={`${clear ? 'text-textBlue1': `${fill} ${color}`} text-xs py-2 px-5`} type={type} onClick={onClick}>{startIcon ? startIcon: ''}{text} {endIcon ? endIcon: ''}</button>
    )
}

export default Button;