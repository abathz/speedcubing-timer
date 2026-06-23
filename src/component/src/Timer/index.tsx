'use client';
import * as React from 'react';

import { useDisclosure } from '@/hooks';

interface IProps {
    onSpaceBar: (time: string) => void;
}

const Timer: React.FC<IProps> = (props) => {
    const { onSpaceBar } = props;

    const [timeElapsed, setTimeElapsed] = React.useState('0.00');
    const [isTimerRun, { open: startTimerRun, close: stopTimerRun }] = useDisclosure(false);
    const timerRef = React.useRef<NodeJS.Timeout>(null);

    const startTimer = React.useCallback(() => {
        const startTime = Date.now();
        timerRef.current = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const elapsedTimeToString = (elapsedTime / 1000).toFixed(2);
            setTimeElapsed(elapsedTimeToString);
        }, 50);
    }, []);

    const stopTimer = React.useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }, []);

    const onSpacebarTapped = React.useCallback(() => {
        if (isTimerRun) {
            stopTimer();
            stopTimerRun();
            onSpaceBar(timeElapsed);
        } else {
            startTimer();
            startTimerRun();
        }
    }, [isTimerRun, timeElapsed]);

    React.useEffect(() => {
        const handleGlobalKeyUp = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                onSpacebarTapped();
            }
        };

        document.addEventListener('keyup', handleGlobalKeyUp);

        return () => {
            document.removeEventListener('keyup', handleGlobalKeyUp);
        };
    }, [isTimerRun, onSpacebarTapped]);

    return <div className='text-11.25/36 font-bold'>{timeElapsed}</div>;
};

export default React.memo(Timer);
