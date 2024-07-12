'use client';

import React, { useEffect, useState, useRef } from 'react';

// https://codepen.io/qkevinto/pen/WQVNWO/

interface DynamicTextAnimatorProps {
  textArray: string[];
  timeout?: number;
  iterations?: number;
  characters?: string;
  pauseDuration?: number;
}

export const DynamicTextAnimator: React.FC<DynamicTextAnimatorProps> = ({
  textArray,
  timeout = 5,
  iterations = 10,
  characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&-+_?/\\=',
  pauseDuration = 1000
}) => {
  const [currentText, setCurrentText] = useState<string>('');
  const [counter, setCounter] = useState<number>(0);
  const elementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const resolver = {
      resolve: function (options: any, callback: () => void) {
        const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
        const combinedOptions = { ...options, resolveString };

        const getRandomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
        const randomCharacter = (chars: string) => chars[getRandomInteger(0, chars.length - 1)];

        const doRandomiserEffect = (opts: any, cb: () => void) => {
          const { characters, timeout, element, partialString } = opts;
          let { iterations } = opts;

          setTimeout(() => {
            if (iterations >= 0) {
              const nextOptions = { ...opts, iterations: iterations - 1 };

              if (iterations === 0) {
                element.textContent = partialString;
              } else {
                element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
              }

              doRandomiserEffect(nextOptions, cb);
            } else if (typeof cb === 'function') {
              cb();
            }
          }, opts.timeout);
        };

        const doResolverEffect = (opts: any, cb: () => void) => {
          const { resolveString, characters, offset } = opts;
          const partialString = resolveString.substring(0, offset);
          const combinedOptions = { ...opts, partialString };

          doRandomiserEffect(combinedOptions, () => {
            const nextOptions = { ...opts, offset: offset + 1 };

            if (offset <= resolveString.length) {
              doResolverEffect(nextOptions, cb);
            } else if (typeof cb === 'function') {
              cb();
            }
          });
        };

        doResolverEffect(combinedOptions, callback);
      }
    };

    const options = {
      offset: 0,
      timeout,
      iterations,
      characters,
      resolveString: textArray[counter],
      element: elementRef.current
    };

    const callback = () => {
      setTimeout(() => {
        setCounter(prevCounter => (prevCounter + 1) % textArray.length);
      }, pauseDuration);
    };

    resolver.resolve(options, callback);

  }, [counter, textArray, timeout, iterations, characters, pauseDuration]);

  return (
    <div className="container">
      <h1 className="heading" data-target-resolver ref={elementRef}>
        {currentText}
      </h1>
    </div>
  );
};
