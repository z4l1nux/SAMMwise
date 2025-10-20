import React from 'react';

/**
 * Flex component - replacement for reflexbox Flex
 * Compatible with React 18
 */
const Flex = ({ 
  children, 
  flexWrap, 
  flexDirection = 'row',
  justifyContent,
  alignItems,
  gap,
  style = {},
  className = '',
  ...props 
}) => {
  const flexStyle = {
    display: 'flex',
    flexWrap: flexWrap || 'nowrap',
    flexDirection,
    justifyContent,
    alignItems,
    gap,
    ...style
  };

  return (
    <div 
      className={className}
      style={flexStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default Flex;
