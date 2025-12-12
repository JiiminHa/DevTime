'use client';

import {useState} from 'react';
import {Textfield} from '@/shared/ui/text-field';
import {Button} from '@/shared/ui/button';
import {validateEmail, validatePassword} from '@/shared/lib/validation';
import {validateAllFields, hasValidationError} from '../model/formHelpers';

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [messages, setMessages] = useState({
    email: {text: '', type: 'error' as 'error' | 'success'},
    password: {text: '', type: 'error' as 'error' | 'success'},
  });

  const handleFieldChange = (name: keyof typeof formData, value: string) => {
    setFormData({...formData, [name]: value});

    const result =
      name === 'email' ? validateEmail(value) : validatePassword(value);

    setMessages({
      ...messages,
      [name]: result,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newMessages = validateAllFields(formData);
    setMessages(newMessages);

    if (hasValidationError(newMessages)) {
      return;
    }

    // TODO: 로그인 API 호출
    console.log('로그인 시도:', formData);
  };

  return (
    <form
      className='flex w-full max-w-md flex-col gap-12'
      onSubmit={handleSubmit}>
      <div className='flex flex-col gap-6'>
        <Textfield
          label='아이디'
          placeholder='이메일을 입력해 주세요.'
          value={formData.email}
          onChange={(value) => handleFieldChange('email', value)}
          message={messages.email}
        />
        <Textfield
          label='비밀번호'
          placeholder='비밀번호를 입력해 주세요.'
          type='password'
          value={formData.password}
          onChange={(value) => handleFieldChange('password', value)}
          message={messages.password}
        />
      </div>

      <Button
        type='submit'
        variant='primary'
        disabled={
          !formData.email ||
          !formData.password ||
          !!messages.email.text ||
          !!messages.password.text
        }
        className='w-full'>
        로그인
      </Button>
    </form>
  );
}
