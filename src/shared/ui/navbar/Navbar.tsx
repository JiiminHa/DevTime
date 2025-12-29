import Logo from '@/shared/assets/logo-horizontal.svg';
export const Navbar = () => {
  return (
    <div className='flex w-full max-w-[1200px] items-center justify-between px-4'>
      <div className='flex items-center justify-start gap-12'>
        <div className='relative h-10 w-36'>
          <Logo />
        </div>
        <div className='flex items-center justify-start gap-9'>
          <div className='text-indigo justify-start text-base leading-5 font-semibold'>
            대시보드
          </div>
          <div className='text-indigo justify-start text-base leading-5 font-semibold'>
            랭킹
          </div>
        </div>
      </div>
      <div className='flex items-center justify-end gap-3'>
        <img className='h-10 w-10' src='https://placehold.co/40x40' />
        <div className='text-indigo justify-center text-right text-base leading-5 font-bold'>
          DevTime
        </div>
      </div>
    </div>
  );
};
