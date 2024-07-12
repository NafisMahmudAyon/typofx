import React from 'react';
interface TypewriterProps {
    texts: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    cursorThickness?: string;
    cursorBlinkSpeed?: number;
    pauseBeforeNext?: number;
    styles?: string;
}
export declare const Typewriter: React.FC<TypewriterProps>;
export {};
