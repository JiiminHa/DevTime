'use client';

import {Button} from '@/shared/ui/button';
import {Textfield} from '@/shared/ui/text-field';
import {Dropdown} from '@/src/shared/ui/dropdown';
import {AutoComplete} from '@/src/shared/ui/auto-complete';
import Link from 'next/link';
import {useForm} from '@/src/shared/form';

export function ProfileForm() {
  const {formData, handleFieldChange, setFormData} = useForm({
    career: '',
    purpose: '',
    customPurpose: '',
    goal: '',
    techStacks: [] as string[],
    profileImage: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직 구현
  };

  return (
    <section>
      <header className='text-primary font-heading flex justify-center font-bold'>
        프로필 설정
      </header>

      <form className='space-y-15' onSubmit={handleSubmit}>
        <fieldset className='space-y-10'>
          <legend className='sr-only'>계정 정보</legend>

          <Dropdown
            label='개발 경력'
            placeholder='개발 경력을 선택해 주세요.'
            value={formData.career}
            onChange={(value) => handleFieldChange('career', value)}
            options={['경력 없음', '0-3년', '4-7년', '8-10년', '11년 이상'].map(
              (career) => ({
                label: career,
                value: career,
              })
            )}
          />

          <Dropdown
            label='공부 목적'
            placeholder='공부의 목적을 선택해 주세요.'
            value={formData.purpose}
            onChange={(value) => handleFieldChange('purpose', value)}
            options={[
              '취업 준비',
              '이직 준비',
              '단순 개발 역량 향상',
              '회사 내 프로젝트 원활하게 수행',
              '기타(직접 입력)',
            ].map((purpose) => ({
              label: purpose,
              value: purpose,
            }))}
          />

          {formData.purpose === '기타(직접 입력)' && (
            <Textfield
              value={formData.customPurpose}
              onChange={(value: string) =>
                handleFieldChange('customPurpose', value)
              }
              className='-mt-8'
            />
          )}

          <Textfield
            label='공부 목표'
            placeholder='공부의 목표를 입력해 주세요.'
            value={formData.goal}
            onChange={(value) => handleFieldChange('goal', value)}
          />

          <AutoComplete
            label='기술 스택'
            placeholder='기술 스택을 입력해 주세요.'
            value={formData.techStacks}
            onChange={(value) => setFormData({...formData, techStacks: value})}
          />
        </fieldset>

        <Button
          type='submit'
          variant='primary'
          className='font-subtitle w-full rounded-sm py-3 font-semibold'>
          저장하기
        </Button>
      </form>

      <footer className='mt-6 flex justify-center gap-3'>
        <span className='font-body text-primary font-regular'>
          다음에 하시겠어요?
        </span>
        <Link href='/' className='text-primary font-bold'>
          건너뛰기
        </Link>
      </footer>
    </section>
  );
}
