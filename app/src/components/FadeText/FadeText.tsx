// FadeText.tsx
import styled, { keyframes } from 'styled-components';

interface FadeTextProps {
  text: string;
  duration?: number;
  fadeIn?: boolean;
}

// Keyframes for fade in and fade out animations
const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

// Styled component that applies the fade animations
const FadeTextWrapper = styled.div<{ duration: number }>`
  animation: ${fadeInOut} ${props => props.duration}s linear infinite;
`;

export const FadeText: React.FC<FadeTextProps> = ({ text, duration = 2 }) => {
  return (
    <FadeTextWrapper duration={duration}>
      {text}
    </FadeTextWrapper>
  );
};
