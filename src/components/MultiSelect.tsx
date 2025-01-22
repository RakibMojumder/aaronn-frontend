"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Option = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
  className?: string;
}

const MultiSelect = ({
  options,
  selected,
  onChange,
  className,
  placeholder = "Select items...",
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOption = (option: Option) => {
    const updatedSelected = selected.some((item) => item.value === option.value)
      ? selected.filter((item) => item.value !== option.value)
      : [...selected, option];
    onChange(updatedSelected);
  };

  const removeOption = (option: Option) => {
    onChange(selected.filter((item) => item.value !== option.value));
  };

  return (
    <div className={cn("relative", className)} ref={wrapperRef}>
      <div
        className={cn(
          "border border-white/10 rounded-lg p-2 flex flex-wrap items-center cursor-pointer min-h-[42px] min-w-min",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <AnimatePresence>
          {selected.length > 0 ? (
            selected.map((item) => (
              <motion.span
                key={item.value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-orange-50 text-primary text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center mb-1"
              >
                {item.label}
                <button
                  className="ml-1 text-primary focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(item);
                  }}
                >
                  ×
                </button>
              </motion.span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">{placeholder}</span>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-neutral-900 border border-neutral-700 rounded-md shadow-lg"
          >
            <input
              type="text"
              className="w-full bg-neutral-900 p-2 border-b border-neutral-700 focus:outline-none"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="max-h-60 overflow-auto">
              {filteredOptions.map((option) => (
                <motion.li
                  key={option.value}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`p-2 hover:bg-neutral-800 cursor-pointer ${
                    selected.some((item) => item.value === option.value)
                      ? "bg-neutral-800"
                      : ""
                  }`}
                  onClick={() => toggleOption(option)}
                >
                  <input
                    type="checkbox"
                    checked={selected.some(
                      (item) => item.value === option.value
                    )}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  {option.label}
                </motion.li>
              ))}
              {filteredOptions.length === 0 && (
                <li className="p-2 text-gray-500">No options found</li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiSelect;
