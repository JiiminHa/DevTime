import React from 'react';
import {TextfieldInput} from '../Atoms/TextFieldInput';

interface TextfieldProps extends Omit<
  React.ComponentProps<typeof TextfieldInput>,
  'error'
> {
  label?: string;
  error?: string; // 에러 메시지 (TextFieldInput의 error는 className)
}

export function Textfield({label, error, ...props}: TextfieldProps) {
  return (
    <div className='flex flex-col gap-2'>
      {label && <label className='font-label text-sm'>{label}</label>}
      <TextfieldInput
        {...props}
        className={error ? 'outline-negative outline' : ''}
      />
      {error && <p className='font-caption text-negative'>{error}</p>}
    </div>
  );
}
