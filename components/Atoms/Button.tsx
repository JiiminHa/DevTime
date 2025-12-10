'use client';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'large' | 'small';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button = ({
  variant = 'primary',
  size = 'large',
  disabled = false,
  onClick,
  children,
  className = '',
}: ButtonProps) => {
  const baseStyles =
    'rounded-sm font-semibold transition-colors px-3 py-4 flex items-center justify-center';

  const variantStyles = {
    primary:
      'bg-primary text-white hover:bg-primary/90 active:bg-primary/90 disabled:bg-disabled-dark disabled:text-disabled-light disabled:cursor-not-allowed focus:outline focus:outline-[1.5px] focus:outline-fuchsia',
    secondary:
      'bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary active:bg-primary/20 active:text-primary disabled:bg-disabled-light disabled:text-disabled-dark disabled:cursor-not-allowed focus:outline focus:outline-[1.5px] focus:outline-fuchsia',
    tertiary:
      'bg-gray-50 text-primary disabled:bg-gray-200 disabled:text-disabled-dark disabled:cursor-not-allowed hover:bg-gray-300 active:bg-gray-300',
  };

  const sizeStyles = {
    large: 'min-w-[88px] h-[48px] text-subtitle',
    small: 'min-w-[77px] h-[44px] text-label',
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={` ${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} `}>
      {children}
    </button>
  );
};
