'use client';

import {useState} from 'react';
import Link from 'next/link';
import {Button} from '@/components/Atoms/Button';
import {Checkbox} from '@/components/Atoms/Checkbox';
import {Textfield} from '@/components/Molecules/TextField';
import {DuplicationCheckField} from '@/components/Molecules/DuplicationCheckField';
import {TermsPanel} from '@/components/Molecules/TermsPanel';

export function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    terms: '',
  });

  const handleCheckDuplication = (fieldName: 'email' | 'nickname') => {
    console.log(`중복 확인 중 ${fieldName}: ${formData[fieldName]}`);
    //Todo: 실제 중복 확인 로직 구현
    if (formData[fieldName]) {
      setErrors((prev) => ({...prev, [fieldName]: ''}));
      alert(`${fieldName} 중복 확인 완료`);
    }
  };

  const validateField = (name: string, value: string | boolean): string => {
    switch (name) {
      case 'email':
        if (!value) return '이메일 형식으로 작성해 주세요';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value as string))
          return '이메일 형식으로 작성해 주세요';
        return '';
      case 'nickname':
        if (!value) return '닉네임을 입력해 주세요';
        return '';
      case 'password':
        if (!value) return '비밀번호를 입력해 주세요';
        if ((value as string).length < 8)
          return '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다';
        return '';
      case 'passwordConfirm':
        if (!value) return '비밀번호를 다시 입력해 주세요';
        if (value !== formData.password) return '비밀번호가 일치하지 않습니다';
        return '';
      default:
        return '';
    }
  };

  const handleFieldChange = (
    name: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData({...formData, [name]: value});
    const error = validateField(name, value);
    setErrors({...errors, [name === 'agreeToTerms' ? 'terms' : name]: error});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: validateField('email', formData.email),
      nickname: validateField('nickname', formData.nickname),
      password: validateField('password', formData.password),
      passwordConfirm: validateField(
        'passwordConfirm',
        formData.passwordConfirm
      ),
      terms: !formData.agreeToTerms ? 'error' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      console.log('Form submitted:', formData);
      alert('회원가입 성공!');
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

          <DuplicationCheckField
            label='아이디'
            placeholder='이메일을 입력해 주세요.'
            value={formData.email}
            onChange={(value) => handleFieldChange('email', value)}
            error={errors.email}
            onCheckDuplication={() => handleCheckDuplication('email')}
          />

          <DuplicationCheckField
            label='닉네임'
            placeholder='닉네임을 입력해 주세요.'
            value={formData.nickname}
            onChange={(value) => handleFieldChange('nickname', value)}
            error={errors.nickname}
            onCheckDuplication={() => handleCheckDuplication('nickname')}
          />

          <Textfield
            label='비밀번호'
            placeholder='비밀번호를 입력해 주세요.'
            value={formData.password}
            onChange={(value) => handleFieldChange('password', value)}
            error={errors.password}
          />

          <Textfield
            label='비밀번호 확인'
            placeholder='비밀번호를 다시 입력해 주세요.'
            value={formData.passwordConfirm}
            onChange={(value) => handleFieldChange('passwordConfirm', value)}
            error={errors.passwordConfirm}
          />
        </fieldset>

        <fieldset className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <legend className='font-label block'>이용약관</legend>
            <label className='flex cursor-pointer items-center gap-2 text-sm'>
              <span className='text-primary/30'>동의함</span>
              <Checkbox
                variant='primary'
                checked={formData.agreeToTerms}
                onChange={(checked) =>
                  handleFieldChange('agreeToTerms', checked)
                }
                error={!!errors.terms}
              />
            </label>
          </div>
          <TermsPanel />
        </fieldset>

        <Button
          variant='primary'
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
