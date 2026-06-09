import { useState, useEffect } from "react";
import TextInput from "./Input";

interface Option {
  label: string;
  value: string;
  data: any;
}

interface Props {
  options: Option[];
  value?: string;
  onSelect?: (item: Option) => void;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  label?: string;
}

export default function InputSearchDropdown({
  options = [],
  value = "",
  onSelect,
  onChangeText,
  placeholder = "Search location...",
  label=""
}: Props) {
  const [searchTerm, setSearchTerm] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  // Keep internal state in sync with external value prop
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleSelect = (item: Option) => {
    setSearchTerm(item.label);
    setIsOpen(false);
    if (onSelect) onSelect(item);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setSearchTerm(newVal);
    setIsOpen(true);
    if (onChangeText) onChangeText(newVal);
  };

  return (
    <div className="relative w-full">
      <TextInput
        id="searching-input"
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onFocus={() => setIsOpen(true)}
        // 200ms delay is necessary to let onMouseDown fire before menu disappears
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        onChange={handleInputChange}
        autoComplete="off"
        label={label+''}
      />

      {/* FIX: We use 'options' directly. 
          The API already filtered these for us.
      */}
      {isOpen && searchTerm.trim().length >= 3 && (
        <ul className="absolute z-[9999] w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-60 overflow-auto">
          {options.length > 0 ? (
            options.map((option, index) => (
              <li
                key={`${option.value}-${index}`}
                onMouseDown={() => handleSelect(option)}
                className="px-4 py-3 cursor-pointer hover:bg-blue-50 text-gray-800 border-b border-gray-100 last:border-none transition-colors"
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-gray-400 italic bg-gray-50">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}