import React, { CSSProperties, HTMLAttributes } from 'react';

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: number | number[] | string;
  p?: number | string;
  m?: number | string;
  px?: number | string;
  py?: number | string;
  mx?: number | string;
  my?: number | string;
  pt?: number | string;
  pb?: number | string;
  pl?: number | string;
  pr?: number | string;
  mt?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  style?: CSSProperties;
  className?: string;
}

const Box = ({
  children,
  width,
  p, m,
  px, py,
  mx, my,
  pt, pb, pl, pr,
  mt, mb, ml, mr,
  style = {},
  className = '',
  ...props
}: BoxProps) => {
  const getWidth = (w: number | number[] | string | undefined): string | undefined => {
    if (!w) return undefined;
    if (Array.isArray(w)) return `${(w[0] as number) * 100}%`;
    if (typeof w === 'number') return `${w * 100}%`;
    return w;
  };

  const getSpacing = (value: number | string | undefined): string | undefined => {
    if (typeof value === 'number') return `${value * 8}px`;
    return value;
  };

  const boxStyle: CSSProperties = {
    width: getWidth(width),
    padding:      p  ? getSpacing(p)  : undefined,
    margin:       m  ? getSpacing(m)  : undefined,
    paddingLeft:  pl ? getSpacing(pl) : px ? getSpacing(px) : undefined,
    paddingRight: pr ? getSpacing(pr) : px ? getSpacing(px) : undefined,
    paddingTop:   pt ? getSpacing(pt) : py ? getSpacing(py) : undefined,
    paddingBottom:pb ? getSpacing(pb) : py ? getSpacing(py) : undefined,
    marginLeft:   ml ? getSpacing(ml) : mx ? getSpacing(mx) : undefined,
    marginRight:  mr ? getSpacing(mr) : mx ? getSpacing(mx) : undefined,
    marginTop:    mt ? getSpacing(mt) : my ? getSpacing(my) : undefined,
    marginBottom: mb ? getSpacing(mb) : my ? getSpacing(my) : undefined,
    ...style,
  };

  return (
    <div className={className} style={boxStyle} {...props}>
      {children}
    </div>
  );
};

export default Box;
