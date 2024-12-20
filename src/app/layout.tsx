import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Franci Task Manager',
  description: 'An app that will help me to finally finish a single project',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-900 w-full h-screen flex overflow-hidden`}
      >
        <SidebarProvider>
          <div className="flex w-full h-full">
            <AppSidebar />
            <main className="flex-1 h-full overflow-hidden">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
