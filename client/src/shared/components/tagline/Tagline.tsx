import { BracketsIcon } from '@shared';

type TTaglineProps = {
  className?: string;
  children?: React.ReactNode;
};
export const Tagline = ({ className = '', children }: TTaglineProps) => {
  return (
    <div className={`tagline flex items-center ${className}`}>
      {BracketsIcon('left')}
      <div className='mx-3 text-n-3 '>{children}</div>
      {BracketsIcon('right')}
    </div>
  );
};
