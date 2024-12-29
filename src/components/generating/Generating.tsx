import { loading } from '../../assets';

type TGeneratingProps = {
  className?: string;
};

export const Generating = ({ className = '' }: TGeneratingProps) => {
  return (
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${className} text-base`}
    >
      <img className='w-5 h-5 mr-4 animate-spin' src={loading} alt='loading' />
      AI is generating
    </div>
  );
};
