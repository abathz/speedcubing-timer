import type React from 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'scramble-display': {
                scramble?: string;
                event?: string;
                visualization?: '2D' | '3D';
                checkered?: boolean;
                style?: React.CSSProperties;
            };
        }
    }
}
