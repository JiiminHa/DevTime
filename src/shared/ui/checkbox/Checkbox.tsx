import CheckedIcon from '@/shared/assets/checked.svg';
import UncheckedIcon from '@/shared/assets/unchecked.svg';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  error?: boolean;
}

export const Checkbox = ({
  checked = false,
  onChange,
  error = false,
}: CheckboxProps) => {
  return (
    <label className='cursor-pointer'>
      {/* 숨겨진 진짜 input (접근성 + 키보드 + form) */}
      <input
        type='checkbox'
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className='sr-only'
      />

      {/* 보이는 SVG */}
      {checked ? (
        <CheckedIcon className={error ? 'stroke-negative' : ''} />
      ) : (
        <UncheckedIcon className={error ? 'stroke-negative' : ''} />
      )}
    </label>
  );
};
