import React from 'react';
import './SlicedCSS.css'; // Import your CSS file

// https://codepen.io/TajShireen/pen/ExLWgGb

export const Sliced = ({ text, backgroundColor, textColor, angle, fontFamily, fontSize }) => {
  // Calculate gradient angle
  const gradientAngle = `${angle}deg`;

  // Inline styles for dynamic properties
  const wrapperStyle = {
    backgroundColor: backgroundColor,
    fontFamily: fontFamily,
    fontSize: fontSize,
  };

  const bottomStyle = {
    background: `linear-gradient(${gradientAngle}, black 53%, ${textColor} 65%)`,
  };

  return (
    <>
    <section className="wrapper" style={wrapperStyle}>
      <div className="top">{text}</div>
      <div className="bottom" aria-hidden="true" style={bottomStyle}>
        {text}
      </div>
    </section>
    {/* <style>
        {`--text-color: hsl(0, 0%, 100%);`}
    </style> */}
    </>
  );
};
