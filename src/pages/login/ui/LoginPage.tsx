'use client';

import Link from 'next/link';
import SymbolLogo from '@/shared/assets/SymbolLogo.svg';
import LogoVertical from '@/shared/assets/LogoVertical.svg';
import {LoginForm} from './LoginForm';
import {useState} from 'react';
import {Modal} from '@/shared/ui/modal/Modal';

export function LoginPage() {
  const [showModal, setShowModal] = useState(false);
  const [showDuplicationModal, setShowDuplicationModal] = useState(false);

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden'>
      <SymbolLogo className='absolute top-15 right-0' />
      <main className='bg-Background-White-50%/50 relative z-10 flex h-[598px] w-[500px] flex-col items-center justify-center gap-12 rounded-[10px] shadow-[0px_40px_100px_40px_rgba(3,104,255,0.05)] backdrop-blur-xl'>
        <LogoVertical />
        <LoginForm
          onLoginFail={() => setShowModal(true)}
          onDuplicateLogin={() => setShowDuplicationModal(true)}
        />
        <Link href='/signup' className='text-primary font-body-small -mt-6'>
          회원가입
        </Link>
      </main>
      {showModal && (
        <Modal
          body={'로그인 정보를 다시 확인해 주세요'}
          onClose={() => setShowModal(false)}
        />
      )}
      {showDuplicationModal && (
        <Modal
          title={'중복 로그인이 불가능합니다.'}
          body={
            '다른 기기에 중복 로그인 된 상태입니다. [확인] 버튼을 누르면 다른 기기에서 강제 로그아웃되며, 진행중이던 타이머가 있다면 기록이 자동 삭제됩니다.'
          }
          onClose={() => setShowDuplicationModal(false)}
        />
      )}
    </div>
  );
}
