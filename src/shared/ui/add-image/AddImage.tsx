import Plus from '@/shared/assets/plus.svg';
import {useState} from 'react';

interface AddImageProps {
  value: File | null;
  onChange: (file: File | null) => void;
}

export function AddImage({value, onChange}: AddImageProps) {
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. 파일 형식 체크
    const allowedTypes = ['image/png', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
      setError(
        '지원하지 않는 파일 형식입니다. PNG 또는 JPG 파일을 선택해주세요.'
      );
      return;
    }

    // 2. 파일 크기 체크 (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('파일 크기가 5MB를 초과합니다.');
      return;
    }

    // 검증 통과!
    setError('');
    onChange(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='image-upload' className='font-label text-sm'>
        프로필 이미지
      </label>
      <input
        type='file'
        id='image-upload'
        className='hidden'
        accept='image/png, image/jpeg'
        onChange={handleFileChange}
      />

      <div>
        <label
          htmlFor='image-upload'
          className='flex items-end justify-start gap-3 self-stretch'>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt='프로필 미리보기'
              className='h-30 w-30 rounded-lg object-cover'
            />
          ) : (
            <div className='outline-primary flex h-28 w-28 items-center justify-center gap-2.5 rounded-lg bg-white p-10 outline -outline-offset-1 outline-dashed'>
              <Plus />
            </div>
          )}

          <p className='justify-center text-sm leading-4 font-medium text-gray-500'>
            5MB 미만의 .png, .jpg 파일
          </p>
        </label>
        {error && <p className='text-negative font-caption'>{error}</p>}
      </div>
    </div>
  );
}
