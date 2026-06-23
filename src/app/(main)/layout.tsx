import * as React from 'react';

import { Sidebar } from '@/component';

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='flex h-screen'>
            <Sidebar />
            <div className='flex-1 overflow-y-scroll'>{children}</div>
        </div>
    );
}
