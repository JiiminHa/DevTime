import React from 'react';

interface TextfieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  message?: {text: string; type: 'error' | 'success'};
  label?: string;
}

export function Textfield({
  label,
  message,
  value,
  onChange,
  placeholder,
  className,
}: TextfieldProps) {
  const inputProps =
    value !== undefined
      ? {
          value,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.(e.target.value),
        }
      : {
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.(e.target.value),
        };

  return (
    <div className='flex flex-col gap-2'>
      {label && <label className='font-label text-sm'>{label}</label>}
      <input
        type='text'
        placeholder={placeholder}
        {...inputProps}
        className={`text-body rounded-sm bg-gray-50 px-4 py-3 ${message?.type === 'error' ? 'outline-negative outline' : ''} ${className}`}
      />
      {message && (
        <p
          className={`font-caption ${message.type === 'error' ? 'text-negative' : 'text-positive'}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
