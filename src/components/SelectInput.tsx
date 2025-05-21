import React from 'react';

interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 bg-transparent border-none focus:outline-none text-gray-900 appearance-none"
    >
      <option value="" className="text-gray-400">선택해주세요</option>
      {options.map((option) => (
        <option key={option} value={option} className="text-gray-900">
          {option}
        </option>
      ))}
    </select>
  );
}; 