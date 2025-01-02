type TInputProps = {
  isError?: boolean;
  errorMessage?: string;
  label?: string;
};

export const Input = ({
  className,
  name,
  label = '',
  placeholder,
  onChange,
  isError,
  errorMessage,
}: React.InputHTMLAttributes<HTMLInputElement> & TInputProps) => {
  return (
    <div className='relative'>
      <input
        name={name}
        onChange={onChange}
        className={`w-full h-[48px] p-5 rounded-[10px] border-2 ${
          isError ? 'border-[#FF4D4F] focus:border-[#FF4D4F]' : ''
        } ${className} text-black`}
        placeholder={placeholder}
      />

      <label
        htmlFor={name}
        className={`absolute left-3 top-[-20%] transform translate-y-[-50%] text-sm font-medium transition-all ${
          isError ? 'text-[#FF4D4F]' : 'text-white'
        }`}
      >
        {label}
      </label>

      {isError && errorMessage && (
        <div className='absolute top-12 left-1 text-[#FF4D4F] text-[11px] font-semibold'>
          {errorMessage}
        </div>
      )}
    </div>
  );
};
