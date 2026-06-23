import * as React from 'react';

interface ScrambleDisplayProps {
    scramble: string;
    event?: string;
}

const ScrambleDisplay: React.FC<ScrambleDisplayProps> = ({ scramble, event = '333' }) => {
    React.useEffect(() => {
        import('scramble-display');
    }, []);

    return <scramble-display scramble={scramble} event={event} style={{ width: '384px', height: '256px' }} />;
};

export default ScrambleDisplay;
