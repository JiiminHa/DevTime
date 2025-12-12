import Link from 'next/link';
import SymbolLogo from '@/shared/assets/SymbolLogo.svg';
import LogoVertical from '@/shared/assets/LogoVertical.svg';
import {LoginForm} from './LoginForm';

export function LoginPage() {
  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden'>
      <SymbolLogo className='absolute top-15 right-0' />
      <main className='bg-Background-White-50%/50 relative z-10 flex h-[598px] w-[500px] flex-col items-center justify-center gap-12 rounded-[10px] shadow-[0px_40px_100px_40px_rgba(3,104,255,0.05)] backdrop-blur-xl'>
        <LogoVertical />
        <LoginForm />
        <Link href='/signup' className='text-primary font-body-small -mt-6'>
          회원가입
        </Link>
      </main>
    </div>
  );
}
