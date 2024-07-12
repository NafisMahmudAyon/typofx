// 'use client'
import React, { useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

// https://codepen.io/antoniasymeonidou/pen/wvPvMve
// Define keyframes for the highlight animation
const highlight = keyframes`
  to {
    background-size: 100% var(--bg-height);
  }
`;

// Styled component for the mark element
interface StyledMarkProps {
  highlightColor: string;
  duration: number;
  inEffect: string;
  outEffect: string;
}

const StyledMark = styled.mark.attrs<StyledMarkProps>(({ highlightColor }) => ({
  style: {
    '--color1': highlightColor,
    '--color2': highlightColor,
    '--bg-height': '40%',
  }
})) <StyledMarkProps>`
  all: unset;
  background-image: linear-gradient(var(--color1), var(--color2));
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0 var(--bg-height);
  animation-fill-mode: forwards;
  animation-play-state: paused;
  ${({ duration, inEffect, outEffect }) => css`
    animation: ${highlight} ${duration}ms 1 ${inEffect} ${outEffect};
  `}
`;

// Props type for the HighlightedText component
interface HighlightedTextProps {
  text: string;
  highlightColor?: string;
  duration?: number;
  inEffect?: string;
  outEffect?: string;
}

// HighlightedText Component
export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlightColor = 'springgreen',
  duration = 800,
  inEffect = 'ease-out',
  outEffect = ''
}) => {
  const markRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            if (entry.target instanceof HTMLElement) {
              entry.target.style.animationPlayState = 'running';
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.8
      }
    );

    if (markRef.current) {
      observer.observe(markRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <StyledMark
      ref={markRef}
      highlightColor={highlightColor}
      duration={duration}
      inEffect={inEffect}
      outEffect={outEffect}
    >
      {text}
    </StyledMark>
  );
};
