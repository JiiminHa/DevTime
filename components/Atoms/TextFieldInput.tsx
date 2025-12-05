'use client';
interface TextfieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}
export const TextfieldInput = ({
  placeholder = '',
  value,
  onChange,
  className = 'bg-gray-50 text-black',
}: TextfieldProps) => {
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
    <div className={`flex flex-col ${className}`}>
      <input
        type='text'
        placeholder={placeholder}
        {...inputProps}
        className={`text-body rounded-sm bg-gray-50 px-4 py-3`}
      />
    </div>
  );
};
