import { PreLoaderIcon } from '@shared';

type TPreLoaderProps = {
  className?: string;
};

export const Preloader = ({ className = '' }: TPreLoaderProps) => {
  return (
    <div className={`${className} w-5 h-5 mr-4 animate-spin`}>
      <PreLoaderIcon />
    </div>
  );
};
