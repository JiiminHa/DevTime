import {Button} from '../Atoms/Button';
import {TextfieldInput} from '../Atoms/TextFieldInput';

interface DuplicationCheckFieldProps extends Omit<
  React.ComponentProps<typeof TextfieldInput>,
  'error'
> {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  onCheckDuplication?: () => void;
}

export function DuplicationCheckField({
  label,
  error,
  onCheckDuplication,
  ...props
}: DuplicationCheckFieldProps) {
  return (
    <div className='flex flex-col gap-2'>
      {label && <label className='font-label'>{label}</label>}
      <div className='flex items-start gap-3'>
        <div className='flex-1'>
          <TextfieldInput
            {...props}
            className={`w-full ${error ? 'outline-negative outline' : ''}`}
          />
          {error && <p className='text-caption text-negative'>{error}</p>}
        </div>
        <Button
          variant='secondary'
          size='small'
          onClick={onCheckDuplication}
          // disabled={true} // TODO
        >
          중복 확인
        </Button>
      </div>
    </div>
  );
}
