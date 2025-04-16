"use client";
import React, { useState, type ReactNode, type MouseEventHandler  } from "react";
import { Button } from "@/components/ui/button";

interface CustomButtonProps {
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "outline" | "ghost";
    name?: string;
    value?: string;
    disabled?: boolean;
    buttonLabel?: string;
    buttonClassName?: string;
    modalContent?: ReactNode;
    modalClassName?: string;
    onClick?: MouseEventHandler<HTMLButtonElement> | (() => void);
    showIcon?: boolean;
    icon?: ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
                                                       type = "button",
                                                       variant = "primary",
                                                       name = "",
                                                       value = "",
                                                       disabled = false,
                                                       buttonLabel = "",
                                                       buttonClassName = "",
                                                       modalContent,
                                                       modalClassName = "",
                                                       onClick,
                                                       showIcon = true,
                                                       icon = "",
                                                   }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e);
        } else {
            setIsModalOpen(true);
        }
    };

    const theme = {
        primary: "bg-carnation-400 hover:bg-carnation-500 text-white",
        outline:
            "bg-transparent hover:bg-carnation-400 hover:text-white border border-carnation-400 text-carnation-400",
        ghost: "bg-transparent hover:bg-neutral-900 text-white",
    };

    return (
        <>
            <Button
                className={`flex items-center text-center justify-center gap-0 px-6 py-3 rounded-md text-md font-medium clickEffect
                    ${theme[variant]} ${buttonClassName}`}
                type={type}
                name={name}
                value={value}
                disabled={disabled}
                onClick={handleButtonClick}
            >
                <span>{buttonLabel}</span>
                {showIcon && <span className="text-base">{icon}</span>}
            </Button>
            {isModalOpen && modalContent && (
                <div className={modalClassName}>
                    {React.cloneElement(modalContent as React.ReactElement, {
                    })}
                </div>
            )}
        </>
    );
};

export default CustomButton;