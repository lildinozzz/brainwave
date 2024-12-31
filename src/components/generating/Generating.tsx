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
      <div className='flex items-center'>
        <span>AI is generating</span>
        <div className='flex gap-[4px] py-[5px] ml-2'>
          <div className='h-[7px] w-[7px] rounded-full bg-white animate-dotPulse delay-02s'></div>
          <div className='h-[7px] w-[7px] rounded-full bg-white animate-dotPulse delay-03s'></div>
          <div className='h-[7px] w-[7px] rounded-full bg-white animate-dotPulse delay-04s'></div>
        </div>
      </div>
    </div>
  );
};
