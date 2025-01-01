import { loading } from 'src/assets';

type TPreLoaderProps = {
  className?: string;
};

export const Preloader = ({ className = '' }: TPreLoaderProps) => {
  return (
    <img className={`${className} w-5 h-5 mr-4 animate-spin`} src={loading} alt='loading' />
  );
};
