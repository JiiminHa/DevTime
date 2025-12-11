'use client';

import {useState} from 'react';
import Link from 'next/link';
import {Button} from '@/shared/ui/button';
import {Checkbox} from '@/shared/ui/checkbox';
import {Textfield} from '@/shared/ui/text-field';
import {TermsPanel} from './TermsPanel';
import {checkEmail, checkNickname} from '../api/checkDuplicateApi';
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validateConfirmPassword,
} from '../model/validation';
import {signup} from '../api/signupApi';

export function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [messages, setMessages] = useState({
    email: {text: '', type: 'error' as 'error' | 'success'},
    nickname: {text: '', type: 'error' as 'error' | 'success'},
    password: {text: '', type: 'error' as 'error' | 'success'},
    confirmPassword: {text: '', type: 'error' as 'error' | 'success'},
    terms: {text: '', type: 'error' as 'error' | 'success'},
  });

  const [isDuplicateChecked, setIsDuplicateChecked] = useState({
    email: false,
    nickname: false,
  });

  // Event Handlers
  const handleFieldChange = (
    name: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData({...formData, [name]: value});

    // 이메일이나 닉네임이 변경되면 중복확인 상태 초기화
    if (name === 'email' || name === 'nickname') {
      setIsDuplicateChecked((prev) => ({...prev, [name]: false}));
    }

    let result: {text: string; type: 'error' | 'success'};

    switch (name) {
      case 'email':
        result = validateEmail(value as string);
        break;
      case 'nickname':
        result = validateNickname(value as string);
        break;
      case 'password':
        result = validatePassword(value as string);
        break;
      case 'confirmPassword':
        result = validateConfirmPassword(value as string, formData.password);
        break;
      case 'agreeToTerms':
        result = value
          ? {text: '', type: 'success'}
          : {text: '약관에 동의해 주세요', type: 'error'};
        break;
      default:
        result = {text: '', type: 'success'};
    }

    setMessages({
      ...messages,
      [name === 'agreeToTerms' ? 'terms' : name]: result,
    });
  };

  const handleCheckDuplication = async (fieldName: 'email' | 'nickname') => {
    const value = formData[fieldName];
    if (!value) return;

    try {
      const data =
        fieldName === 'email'
          ? await checkEmail(value)
          : await checkNickname(value);

      if (data.success && data.available) {
        setIsDuplicateChecked((prev) => ({...prev, [fieldName]: true}));
        setMessages((prev) => ({
          ...prev,
          [fieldName]: {text: data.message, type: 'success'},
        }));
      } else {
        setMessages((prev) => ({
          ...prev,
          [fieldName]: {text: data.message, type: 'error'},
        }));
      }
    } catch (error) {
      setMessages((prev) => ({
        ...prev,
        [fieldName]: {
          text: '중복 확인 중 오류가 발생했습니다. 다시 시도해 주세요.',
          type: 'error',
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 검증
    const newMessages = {
      email: validateEmail(formData.email),
      nickname: validateNickname(formData.nickname),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.confirmPassword,
        formData.password
      ),
      terms: formData.agreeToTerms
        ? {text: '', type: 'success' as const}
        : {text: '약관에 동의해 주세요', type: 'error' as const},
    };

    setMessages(newMessages);

    // 2. 에러 체크
    const hasError =
      newMessages.email.text ||
      newMessages.nickname.text ||
      newMessages.password.text ||
      newMessages.confirmPassword.text ||
      newMessages.terms.text;

    if (hasError) {
      return; // 에러 있으면 중단
    }

    // 3. 에러 없으면 API 호출
    try {
      const result = await signup({
        email: formData.email,
        nickname: formData.nickname,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (result.success) {
        alert('회원가입이 완료되었습니다!');
      } else {
        alert(`회원가입에 실패했습니다: ${result.message}`);
      }
    } catch (error) {
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <section>
      <header className='text-primary font-heading flex justify-center font-bold'>
        회원가입
      </header>

      <form className='space-y-15' onSubmit={handleSubmit}>
        <fieldset className='space-y-10'>
          <legend className='sr-only'>계정 정보</legend>

          <Textfield
            label='아이디'
            placeholder='이메일을 입력해 주세요.'
            value={formData.email}
            onChange={(value) => handleFieldChange('email', value)}
            message={messages.email}
            rightElement={
              <Button
                variant='secondary'
                size='small'
                disabled={!formData.email}
                onClick={() => handleCheckDuplication('email')}>
                중복 확인
              </Button>
            }
          />

          <Textfield
            label='닉네임'
            placeholder='닉네임을 입력해 주세요.'
            value={formData.nickname}
            onChange={(value) => handleFieldChange('nickname', value)}
            message={messages.nickname}
            rightElement={
              <Button
                variant='secondary'
                size='small'
                disabled={!formData.nickname}
                onClick={() => handleCheckDuplication('nickname')}>
                중복 확인
              </Button>
            }
          />

          <Textfield
            type='password'
            label='비밀번호'
            placeholder='비밀번호를 입력해 주세요.'
            value={formData.password}
            onChange={(value) => handleFieldChange('password', value)}
            message={messages.password}
          />

          <Textfield
            type='password'
            label='비밀번호 확인'
            placeholder='비밀번호를 다시 입력해 주세요.'
            value={formData.confirmPassword}
            onChange={(value) => handleFieldChange('confirmPassword', value)}
            message={messages.confirmPassword}
          />
        </fieldset>

        <fieldset className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <legend className='font-label block'>이용약관</legend>
            <label className='flex cursor-pointer items-center gap-2 text-sm'>
              <span className='text-primary/30'>동의함</span>
              <Checkbox
                checked={formData.agreeToTerms}
                onChange={(checked) =>
                  handleFieldChange('agreeToTerms', checked)
                }
              />
            </label>
          </div>
          <TermsPanel />
          {messages.terms.text && (
            <p className='text-caption text-negative'>{messages.terms.text}</p>
          )}
        </fieldset>

        <Button
          type='submit'
          variant='primary'
          disabled={!isDuplicateChecked.email || !isDuplicateChecked.nickname}
          className='font-subtitle w-full rounded-sm py-3 font-semibold'>
          회원가입
        </Button>
      </form>

      <footer className='mt-6 flex justify-center gap-3'>
        <span className='font-body text-primary font-regular'>
          회원이신가요?
        </span>
        <Link href='/login' className='text-primary font-bold'>
          로그인 바로가기
        </Link>
      </footer>
    </section>
  );
}
