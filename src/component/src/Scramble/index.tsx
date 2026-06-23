import { getScramble } from 'cube-scramble';
import * as React from 'react';

import ScrambleDisplay from '../ScrambleDisplay';
import Skeleton from '../Skeleton';

const Scramble: React.FC = () => {
    const [scramble, setScramble] = React.useState('');

    const generateScramble = () => {
        const newScramble = getScramble('333');
        setScramble(newScramble);
    };

    React.useEffect(() => {
        generateScramble();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center'>
            <ScrambleDisplay scramble={scramble} />
            {scramble ? <div className='text-2xl'>{scramble}</div> : <Skeleton height={32} width={600} />}
            <button className='bg-green active:bg-green-70 h-11 rounded-sm px-5 text-white' onClick={generateScramble}>
                Generate
            </button>
        </div>
    );
};

export default Scramble;
