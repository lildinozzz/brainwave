export const PagePreLoader = () => {
  return (
    <div className='w-full h-full max-w-[480px] flex items-center justify-center my-auto absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
      <div
        role='status'
        className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-e-transparent align-[-0.125rem] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]'
      >
        <span className='absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0,0)]' />
      </div>
    </div>
  );
};
