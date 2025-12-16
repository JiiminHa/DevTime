'use client';

import {Button} from '@/shared/ui/button';
import {Textfield} from '@/shared/ui/text-field';
import {Dropdown} from '@/shared/ui/dropdown';
import {AutoComplete} from '@/shared/ui/auto-complete';
import {useRouter} from 'next/navigation';
import {useForm} from '@/shared/form';
import {AddImage} from '@/shared/ui/add-image';
import {Modal} from '@/shared/ui/modal/Modal';
import {useState} from 'react';
import {getPresignedUrl} from '../api/presignedUrlApi';
import {submitProfile, updateProfile} from '../api/profileApi';
import type {Purpose} from '../model/types';

export function ProfileForm() {
  const {formData, handleFieldChange, setFormData} = useForm({
    career: '',
    purpose: '',
    customPurpose: '',
    goal: '',
    techStacks: [] as string[],
  });
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [showPassModal, setShowPassModal] = useState(false);

  const handleSkip = () => {
    router.push('/'); // 건너뛰기 클릭 시 이동할 경로
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 이미지가 선택되었다면 업로드
    let imageKey = '';
    if (profileImage) {
      try {
        const {presignedUrl, key} = await getPresignedUrl(profileImage);

        // 2. presignedUrl로 실제 파일 업로드
        await fetch(presignedUrl, {
          method: 'PUT',
          body: profileImage,
          headers: {
            'Content-Type': profileImage.type,
          },
        });

        imageKey = key;
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
        return;
      }
    }

    // 2. purpose를 API 스펙에 맞게 변환
    let purpose: Purpose = '';
    if (formData.purpose === '기타(직접 입력)') {
      purpose = {
        type: '기타',
        ...(formData.customPurpose.trim() && {detail: formData.customPurpose}),
      };
    } else if (formData.purpose) {
      purpose = formData.purpose as Purpose;
    }

    // 3. 프로필 생성 API 호출
    const payload = {
      career: formData.career || '',
      purpose: purpose,
      goal: formData.goal || '',
      techStacks: formData.techStacks || [],
      profileImage: imageKey || '',
    };

    console.log('제출할 payload:', JSON.stringify(payload, null, 2));

    try {
      // 먼저 POST로 생성 시도
      await submitProfile(payload);
      console.log('프로필 생성 성공');
      router.push('/'); // 제출 후 메인화면으로 이동
    } catch (error) {
      // "이미 프로필이 존재합니다" 에러인 경우 PUT으로 업데이트 시도
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.log('POST 실패, 에러 메시지:', errorMessage);
      
      if (errorMessage.includes('이미 프로필이 존재합니다') || errorMessage.includes('프로필이 존재합니다')) {
        console.log('프로필이 이미 존재하므로 PUT으로 업데이트 시도');
        try {
          await updateProfile(payload);
          console.log('프로필 업데이트 성공');
          router.push('/'); // 업데이트 후 메인화면으로 이동
        } catch (updateError) {
          const updateErrorMessage = updateError instanceof Error ? updateError.message : String(updateError);
          console.error('프로필 업데이트 실패:', updateError);
          console.error('업데이트 에러 메시지:', updateErrorMessage);
          alert(`프로필 업데이트에 실패했습니다: ${updateErrorMessage}`);
        }
      } else {
        console.error('프로필 제출 실패:', error);
        alert(`프로필 설정에 실패했습니다: ${errorMessage}`);
      }
    }
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
            options={['경력 없음', '0 - 3년', '4 - 7년', '8 - 10년', '11년 이상'].map(
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

          <AddImage value={profileImage} onChange={setProfileImage} />
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
        <button
          type='button'
          onClick={() => setShowPassModal(true)}
          className='text-primary font-bold'>
          건너뛰기
        </button>
      </footer>
      {showPassModal && (
        <Modal
          title={'프로필 설정을 건너뛸까요?'}
          body={
            '프로필을 설정하지 않을 경우 일부 기능 사용에 제한이 생길 수 있습니다. 그래도 프로필 설정을 건너뛰시겠습니까? '
          }
          confirmText='계속 설정하기'
          onClose={() => setShowPassModal(false)}
          cancelText='건너뛰기'
          onCancel={handleSkip}
        />
      )}
    </section>
  );
}
