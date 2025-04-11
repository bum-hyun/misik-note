interface IArrowIconProps {
  width?: number;
  height?: number;
  direction: string;
  color?: string;
  onClick?: () => void;
}

const ArrowIcon = ({ width, height, direction, color, ...rest }: IArrowIconProps) => {
  return (
    <>
      {direction === 'up' && (
        <svg {...rest} width={width ?? 16} height={width ?? 16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5L13 10L12.3 10.7L8 6.4L3.7 10.7L3 10L8 5Z" fill={color || '#F8F9FA'} />
        </svg>
      )}
      {direction === 'down' && (
        <svg {...rest} width={width ?? 16} height={width ?? 16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 11L3 5.99999L3.7 5.29999L8 9.59999L12.3 5.29999L13 5.99999L8 11Z" fill={color || '#212529'} />
        </svg>
      )}
      {direction === 'left' && (
        <svg xmlns="http://www.w3.org/2000/svg" height={height ?? 24} viewBox="0 -960 960 960" width={width ?? 24} fill={color ?? '#5f6368'}>
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
        </svg>
      )}
      {direction === 'right' && (
        <svg xmlns="http://www.w3.org/2000/svg" height={height ?? 24} viewBox="0 -960 960 960" width={width ?? 24} fill={color ?? '#5f6368'}>
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
      )}
    </>
  );
};

export default ArrowIcon;
