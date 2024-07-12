import React, { useEffect, useRef } from 'react';
import { annotate } from 'rough-notation';

// Custom Annotation Component
export const NotationText = ({ children, type, color, padding = 0, onLoad = false }) => {
  const ref = useRef();

  useEffect(() => {
    const runAnnotation = () => {
      if (ref.current) {
        const annotation = annotate(ref.current, { type, color, padding });
        annotation.show();
      }
    };

    if (onLoad) {
      runAnnotation();
    } else {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              runAnnotation();
              observer.unobserve(entry.target); // Stop observing after the annotation is shown
            }
          });
        },
        { threshold: 1 } // Trigger when at least 10% of the element is visible
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }
  }, [type, color, padding, onLoad]);

  return <span ref={ref}>{children}</span>;
};