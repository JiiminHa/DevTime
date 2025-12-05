'use client';

interface CheckboxProps {
  variant?: 'primary' | 'secondary';
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export const Checkbox = ({
  variant = 'primary',
  checked = false,
  onChange,
  className = '',
}: CheckboxProps) => {
  const baseStyles = 'h-4 w-4 rounded-sm border-1px transition-colors';
  const variantStyles = {
    primary: 'bg-primary/10 border-primary checked:primary',
    secondary: 'border-white checked: white',
  };
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        className={`${baseStyles} ${variantStyles[variant]}`}
      />
    </div>
  );
};
