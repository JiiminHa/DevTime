'use client';

import {useState, useRef, useEffect, useId} from 'react';
import {searchTechStacks, createTechStack} from '../../api/techStack';
interface AutoCompleteProps {
  label: string;
  placeholder: string;
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

export function AutoComplete({
  label,
  placeholder,
  value,
  onChange,
  className,
}: AutoCompleteProps) {
  const id = useId();
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // API 호출 (debounce)
  useEffect(() => {
    if (!inputValue) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await searchTechStacks(inputValue);
        setSuggestions(results.filter((item) => !value.includes(item)));
        setIsOpen(true);
      } catch (error) {
        console.error('검색 실패:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, value]);

  // 항목 추가
  const handleAddItem = (item: string) => {
    onChange([...value, item]);
    setInputValue('');
    setIsOpen(false);
  };

  // 항목 삭제
  const handleRemoveItem = (itemToRemove: string) => {
    onChange(value.filter((item) => item !== itemToRemove));
  };

  // 새 항목 생성
  const handleCreateAndAdd = async () => {
    try {
      await createTechStack(inputValue.trim());
      handleAddItem(inputValue.trim());
    } catch (error) {
      console.error('생성 실패:', error);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={id} className='font-label text-sm'>
        {label}
      </label>

      <div ref={containerRef} className='relative'>
        <input
          id={id}
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className={`font-body w-full rounded-sm bg-gray-50 px-4 py-3 ${className} `}
        />

        {isOpen && inputValue && (
          <div className='border-border absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-sm border bg-white shadow-lg'>
            {isLoading ? (
              <div className='font-body px-4 py-3 text-gray-400'>
                검색 중...
              </div>
            ) : suggestions.length > 0 ? (
              <>
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type='button'
                    onClick={() => handleAddItem(suggestion)}
                    className='font-body w-full px-4 py-3 text-left hover:bg-gray-100'>
                    {suggestion}
                  </button>
                ))}

                <button
                  type='button'
                  onClick={handleCreateAndAdd}
                  className='font-body text-indigo w-full border-t px-4 py-3 text-left hover:font-semibold'>
                  + Add New Item
                </button>
              </>
            ) : (
              <>
                <div className='font-body px-4 py-3 text-gray-400'>
                  검색 결과가 없습니다
                </div>
                <button
                  type='button'
                  onClick={handleCreateAndAdd}
                  className='font-body text-indigo w-full border-t px-4 py-3 text-left hover:font-semibold'>
                  + Add New Item
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {value.length > 0 && (
        <div className='mt-2 flex flex-wrap gap-2'>
          {value.map((item) => (
            <div
              key={item}
              className='bg-primary/10 font-label border-primary text-primary flex items-center gap-2 rounded-[5px] border p-3 text-sm'>
              <span>{item}</span>
              <button
                type='button'
                onClick={() => handleRemoveItem(item)}
                className='font-label text-lg leading-none'
                aria-label={`${item} 제거`}>
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
