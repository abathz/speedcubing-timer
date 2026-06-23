'use client';
import * as React from 'react';
import { useShallow } from 'zustand/shallow';

import { Scramble } from '@/component';
import Timer from '@/component/src/Timer';
import { useTimeLogStore } from '@/store';
import { cn } from '@/utils';

const Main = () => {
    const { pushTimeLog, times } = useTimeLogStore(
        useShallow((store) => ({
            times: store.times,
            pushTimeLog: store.pushTimeLog,
        }))
    );

    const diffTime = React.useMemo(
        () => ({
            isFaster: parseFloat(times[times.length - 1]) < parseFloat(times[times.length - 2]),
            diff: Math.abs(parseFloat(times[times.length - 1]) - parseFloat(times[times.length - 2])),
        }),
        [times]
    );

    return (
        <div className='container mx-auto flex flex-1 flex-col py-20'>
            <div className='mb-14 text-center'>
                <div className='text-4xl font-bold text-pink-400'>Speedcubing Timer</div>
            </div>
            <div className='mb-14 flex items-end justify-center gap-x-3'>
                <Timer onSpaceBar={pushTimeLog} />
                {times.length > 1 ? (
                    <div className={cn('text-2xl', diffTime.isFaster ? 'text-green' : 'text-red')}>
                        ({diffTime.isFaster ? '-' : '+'}
                        {diffTime.diff.toFixed(2)})
                    </div>
                ) : null}
            </div>
            <Scramble />
        </div>
    );
};

export default Main;
