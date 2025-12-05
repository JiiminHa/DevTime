'use client';
interface TextfieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const Textfield = ({
  placeholder = '',
  value = '',
  onChange,
  className = '',
}: TextfieldProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={`text-body rounded-sm bg-gray-50 px-4 py-3`}
      />
    </div>
  );
};
