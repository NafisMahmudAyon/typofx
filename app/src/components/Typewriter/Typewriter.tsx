'use client';

import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  cursorThickness?: string;
  cursorBlinkSpeed?: number;
  pauseBeforeNext?: number;
  styles?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  texts,
  typingSpeed = 150,
  deletingSpeed = 50,
  cursorThickness = '1px',
  cursorBlinkSpeed = 500,
  pauseBeforeNext = 1000,
  styles = '',
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentTextIndex];
      if (isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
      }

      if (!isDeleting && displayedText === fullText) {
        setTimeout(() => setIsDeleting(true), pauseBeforeNext);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, texts, currentTextIndex, typingSpeed, deletingSpeed, pauseBeforeNext]);

  return (
    <>{" "}<span className={`${styles} typewriter`}>{displayedText}</span>
      <style>{`
        .typewriter::after {
          border-right: ${cursorThickness} solid currentcolor;
          animation: blink ${cursorBlinkSpeed}ms step-end infinite;
        }
      `}</style>
    </>
  );
};
