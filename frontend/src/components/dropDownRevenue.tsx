import React, { useState, useEffect, useRef } from "react";

interface DropdownProps {
  label: string;
  options: { label: string; link: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Add the event listener when dropdown is open, remove when closed
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    } else {
      window.removeEventListener("click", handleClickOutside);
    }

    // Cleanup listener when component unmounts or dropdown closes
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center text-gray-700 hover:text-[#709ec9] font-bold lg:font-bold"
        onClick={toggleDropdown}
      >
        {label}
        <svg
          className="w-5 h-5 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute mt-1 bg-white shadow-lg w-48 p-2 z-40"
        >
          {options.map((option, index) => (
            <a
              key={index}
              href={option.link}
              className="block py-1 px-2 text-gray-700 hover:bg-gray-100"
            >
              {option.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
