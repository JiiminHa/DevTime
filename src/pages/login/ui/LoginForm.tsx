'use client';

import {useState} from 'react';
import {Textfield, Button} from '@/shared/ui';
import {validateEmail, validatePassword, useForm} from '@/shared/form';
import {validateAllFields, hasValidationError} from '../model/formHelpers';
import {login} from '../api/loginApi';
import {useRouter} from 'next/navigation';

interface LoginFormProps {
  onLoginFail: () => void;
  onDuplicateLogin: () => void;
}

export function LoginForm({onLoginFail, onDuplicateLogin}: LoginFormProps) {
  const {formData, setFormData} = useForm({
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
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newMessages = validateAllFields(formData);
    setMessages(newMessages);

    if (hasValidationError(newMessages)) {
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        if (result.isDuplicateLogin) {
          onDuplicateLogin();
        } else {
          alert('로그인 성공!');
          if (result.refreshToken) {
            localStorage.setItem('refreshToken', result.refreshToken);
          }
          router.push('/');
        }
      } else {
        onLoginFail();
      }
    } catch (error) {
      alert('로그인 중 오류가 발생했습니다.');
    }
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
