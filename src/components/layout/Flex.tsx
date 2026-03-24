import React, { CSSProperties, HTMLAttributes } from 'react';

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  flexWrap?: CSSProperties['flexWrap'];
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  gap?: CSSProperties['gap'];
  style?: CSSProperties;
  className?: string;
}

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
}: FlexProps) => {
  const flexStyle: CSSProperties = {
    display: 'flex',
    flexWrap: flexWrap || 'nowrap',
    flexDirection,
    justifyContent,
    alignItems,
    gap,
    ...style,
  };

  return (
    <div className={className} style={flexStyle} {...props}>
      {children}
    </div>
  );
};

export default Flex;
