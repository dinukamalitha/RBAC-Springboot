'use client';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DropdownProps {
    options: { label: string; value: string }[];
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    width?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, placeholder = "Select an option", value, onChange, width }) => {
    const handleSelectChange = (selectedValue: string) => {
        if (onChange) {
            onChange(selectedValue);
        }
    };

    return (
        <div style={{ width }}>
            <Select onValueChange={handleSelectChange} value={value}>
                <SelectTrigger className={`w-full mb-1 h-10 py-2 px-3 text-sm text-black border rounded-md border-gray-400 focus:outline-none focus:ring-gray-700 focus:border-carnation-300`} style={width ? { width } : undefined}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default Dropdown;