import { ButtonSvg } from 'src/assets/svg';

type TButtonProps = {
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  px?: string;
  theme?: boolean;
  disabled?: boolean;
};

export const Button = ({
  className,
  type,
  onClick,
  children,
  px,
  disabled,
  theme,
}: TButtonProps) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || 'px-7'
  } ${theme ? 'text-n-8' : 'text-n-1'} ${className || ''}`;

  const spanClasses = 'relative z-10';

  return (
    <button
      disabled={disabled}
      type={type}
      className={classes}
      onClick={onClick}
    >
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(theme)}
    </button>
  );
};
