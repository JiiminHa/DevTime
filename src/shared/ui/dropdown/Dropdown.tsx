'use client';

import {useState, useRef, useEffect, useId} from 'react';
import ChevronDown from '@/shared/assets/chevron-down.svg';

interface DropdownProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  options: {label: string; value: string}[];
}
export function Dropdown({
  label,
  placeholder,
  value,
  onChange,
  className,
  options,
}: DropdownProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={id} className='font-label text-sm'>
        {label}
      </label>
      <div ref={dropdownRef} className='relative'>
        <button
          id={id}
          type='button'
          onClick={() => setIsOpen(!isOpen)}
          className={`font-body flex w-full items-center justify-between rounded-sm bg-gray-50 px-4 py-3 text-left ${className} `}>
          <span className={selectedOption ? '' : 'text-disabled-dark'}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className='border-border absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-sm border bg-white shadow-lg'>
            {options.map((option) => (
              <button
                key={option.value}
                type='button'
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`font-body hover:text-indigo w-full px-4 py-3 text-left hover:font-bold ${option.value === value ? 'text-gray-600' : ''} `}>
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
