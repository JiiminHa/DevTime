import Plus from '@/src/shared/assets/plus.svg';
export function AddImage() {
  {
    return (
      <div className='flex flex-col gap-2'>
        <label htmlFor='image-upload' className='font-label text-sm'>
          프로필 이미지
        </label>
        <div className='inline-flex items-end justify-start gap-3 self-stretch'>
          <div className='outline-primary flex h-28 w-28 items-center justify-center gap-2.5 rounded-lg bg-white p-10 outline -outline-offset-1 outline-dashed'>
            <Plus />
          </div>
          <p className='justify-center text-sm leading-4 font-medium text-gray-500'>
            5MB 미만의 .png, .jpg 파일
          </p>
        </div>
      </div>
    );
  }
}
