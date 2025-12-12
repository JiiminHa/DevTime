import React from 'react';

interface TextfieldProps {
  type?: 'text' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  message?: {text: string; type: 'error' | 'success'};
  label?: string;
  rightElement?: React.ReactNode;
}

export function Textfield({
  type = 'text',
  label,
  message,
  value,
  onChange,
  placeholder,
  className,
  rightElement,
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
      {rightElement ? (
        <div className='flex items-start gap-3'>
          <input
            type={type}
            placeholder={placeholder}
            {...inputProps}
            className={`text-body flex-1 rounded-sm bg-gray-50 px-4 py-3 ${message?.type === 'error' && message?.text ? 'outline-negative outline' : ''} ${className}`}
          />
          {rightElement}
        </div>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          {...inputProps}
          className={`text-body rounded-sm bg-gray-50 px-4 py-3 ${message?.type === 'error' && message?.text ? 'outline-negative outline' : ''} ${className}`}
        />
      )}
      {message && (
        <p
          className={`font-caption ${message.type === 'error' ? 'text-negative' : 'text-positive'}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
