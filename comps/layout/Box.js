import React from 'react';

/**
 * Box component - replacement for reflexbox Box
 * Compatible with React 18
 */
const Box = ({ 
  children, 
  width, 
  p, // padding
  m, // margin
  px, // padding horizontal
  py, // padding vertical
  mx, // margin horizontal
  my, // margin vertical
  pt, // padding top
  pb, // padding bottom
  pl, // padding left
  pr, // padding right
  mt, // margin top
  mb, // margin bottom
  ml, // margin left
  mr, // margin right
  style = {},
  className = '',
  ...props 
}) => {
  // Convert width array to responsive width
  const getWidth = (width) => {
    if (!width) return undefined;
    if (Array.isArray(width)) {
      // For responsive design, use the first value (mobile-first)
      return `${width[0] * 100}%`;
    }
    if (typeof width === 'number') {
      return `${width * 100}%`;
    }
    return width;
  };

  // Convert spacing values to pixels
  const getSpacing = (value) => {
    if (typeof value === 'number') {
      return `${value * 8}px`; // reflexbox uses 8px base unit
    }
    return value;
  };

  const boxStyle = {
    width: getWidth(width),
    padding: p ? getSpacing(p) : undefined,
    margin: m ? getSpacing(m) : undefined,
    paddingLeft: pl ? getSpacing(pl) : px ? getSpacing(px) : undefined,
    paddingRight: pr ? getSpacing(pr) : px ? getSpacing(px) : undefined,
    paddingTop: pt ? getSpacing(pt) : py ? getSpacing(py) : undefined,
    paddingBottom: pb ? getSpacing(pb) : py ? getSpacing(py) : undefined,
    marginLeft: ml ? getSpacing(ml) : mx ? getSpacing(mx) : undefined,
    marginRight: mr ? getSpacing(mr) : mx ? getSpacing(mx) : undefined,
    marginTop: mt ? getSpacing(mt) : my ? getSpacing(my) : undefined,
    marginBottom: mb ? getSpacing(mb) : my ? getSpacing(my) : undefined,
    ...style
  };

  return (
    <div 
      className={className}
      style={boxStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default Box;
