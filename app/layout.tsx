import type {Metadata} from 'next';
import './globals.css';
import {Providers} from '@/app/provider';

export const metadata: Metadata = {
  title: 'DevTime',
  description: '개발 시간 관리 앱',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
