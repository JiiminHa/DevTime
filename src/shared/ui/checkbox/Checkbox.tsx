import CheckedIcon from '@/shared/assets/checked.svg';
import UncheckedIcon from '@/shared/assets/unchecked.svg';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  error?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export const Checkbox = ({
  checked = false,
  onChange,
  error = false,
  ...aria
}: CheckboxProps) => {
  return (
    <label className='cursor-pointer'>
      {/* 숨겨진 진짜 input (접근성 + 키보드 + form) */}
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className='peer sr-only'
        {...aria}
      />

      {/* 보이는 SVG */}
      {checked ? (
        <CheckedIcon
          className={`${error ? 'stroke-negative' : ''} peer-focus-visible:ring-primary peer-focus-visible:ring-1`}
        />
      ) : (
        <UncheckedIcon
          className={`${error ? 'stroke-negative' : ''} peer-focus-visible:ring-primary peer-focus-visible:ring-1`}
        />
      )}
    </label>
  );
};
