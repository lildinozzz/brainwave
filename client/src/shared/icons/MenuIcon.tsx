type TMenuIconProps = {
  isOpenedNavigation: boolean;
};

export const MenuIcon = ({ isOpenedNavigation }: TMenuIconProps) => {
  return (
    <svg
      className='overflow-visible'
      width='20'
      height='12'
      viewBox='0 0 20 12'
    >
      <rect
        className='transition-all origin-center'
        y={isOpenedNavigation ? '5' : '0'}
        width='20'
        height='2'
        rx='1'
        fill='white'
        transform={`rotate(${isOpenedNavigation ? '45' : '0'})`}
      />
      <rect
        className='transition-all origin-center'
        y={isOpenedNavigation ? '5' : '10'}
        width='20'
        height='2'
        rx='1'
        fill='white'
        transform={`rotate(${isOpenedNavigation ? '-45' : '0'})`}
      />
    </svg>
  );
};
