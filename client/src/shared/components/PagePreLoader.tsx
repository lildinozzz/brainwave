type TLoaderProps = {
  className?: string;
};

export const PagePreLoader = ({ className }: TLoaderProps) => {
  return (
    <div className={`'flex items-center justify-center' ${className}`}>
      <div
        role='status'
        className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-e-transparent align-[-0.125rem] text-black motion-reduce:animate-[spin_1.5s_linear_infinite]'
      >
        <span className='absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0,0)]' />
      </div>
    </div>
  );
};
