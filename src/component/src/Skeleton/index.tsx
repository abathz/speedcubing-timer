import * as React from 'react';

interface SkeletonProps {
    width?: number | `${number}%`;
    height?: number | `${number}%`;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = 20 }) => (
    <div style={{ width, height }} className='animate-pulse rounded-sm bg-gray-300' />
);

export default Skeleton;
