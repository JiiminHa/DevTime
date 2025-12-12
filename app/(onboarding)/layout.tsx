import type {ReactNode} from 'react';
import Logo from '@/shared/assets/LogoVerticalWhite.svg';

export default function OnboardingLayout({children}: {children: ReactNode}) {
  return (
    <div className='flex min-h-screen'>
      {/* 왼쪽 파란 영역 */}
      <section className='bg-primary flex flex-1 items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-9'>
          <Logo className='w-{264px} h-{200px}' />
          <div className='text-center'>
            <p className='font-title font-semibold text-white'>
              개발자를 위한 타이머
            </p>
          </div>
        </div>
      </section>

      {/* 오른쪽 폼 영역 */}
      <main className='flex flex-1 items-center justify-center bg-white'>
        <div className='flex flex-col'>{children}</div>
      </main>
    </div>
  );
}
