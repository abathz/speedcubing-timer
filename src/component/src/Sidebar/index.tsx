'use client';
import * as React from 'react';
import { GitHub } from 'react-feather';

import { useTimeLogStore } from '@/store';

import packageJson from '../../../../package.json';

const Sidebar: React.FC = () => {
    const times = useTimeLogStore((store) => store.times);

    const bestTime = React.useMemo(
        () => (times.length > 0 ? Math.min(...times.map((time) => parseFloat(time))) : 0),
        [times]
    );

    const averageTime = React.useMemo(
        () => times.reduce((acc, time) => acc + parseFloat(time), 0) / times.length || 0,
        [times]
    );

    return (
        <div className='bg-gray-5 flex h-screen w-1/4 flex-col p-4'>
            <section className='flex flex-1 flex-col'>
                <table className='table self-start text-center'>
                    <thead>
                        <tr>
                            <th className='border border-gray-500 px-5 py-2 text-green-600'>Best Time</th>
                            <th className='border border-gray-500 px-5 py-2 text-blue-500'>Average Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border border-gray-500 px-5 py-2 font-medium'>{bestTime.toFixed(2)}s</td>
                            <td className='border border-gray-500 px-5 py-2 font-medium'>{averageTime.toFixed(2)}s</td>
                        </tr>
                    </tbody>
                </table>
                <div className='flex flex-1 flex-col'>
                    <p className='font-bold'>Time Record</p>
                    <div className='flex h-48 flex-col gap-y-1 overflow-y-scroll rounded-sm border border-gray-600 px-4 py-2'>
                        {times.length > 0 ? (
                            times.map((data: string, index: number) => <div key={`time-${index}`}>{data}s</div>)
                        ) : (
                            <div>
                                <span className='text-muted'>No time recorded</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <div className='flex flex-col gap-y-1'>
                <div className='flex gap-x-1 text-gray-400'>
                    <div className='text-xs font-bold'>Speedcubing Timer</div>
                    <div className='text-xs font-bold'>v{packageJson.version}</div>
                </div>
                <a href='https://github.com/abathz/speedcubing-timer' target='_blank' rel='noreferrer'>
                    <GitHub className='hover:text-gray-70 text-gray-20 cursor-pointer' size={18} />
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
