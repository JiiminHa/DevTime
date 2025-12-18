import {Navbar} from '@/src/shared/ui/navbar';
import type {ReactNode} from 'react';

export default function MainLayout({children}: {children: ReactNode}) {
  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-linear-to-b from-neutral-100 to-slate-200'>
      <div className='flex justify-center pt-4'>
        <Navbar />
      </div>
      {children}
    </div>
  );
}
