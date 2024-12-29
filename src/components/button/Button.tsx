import { ButtonSvg } from "../../assets/svg";

type TButtonProps = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  px?: string;
  theme?: string;
};

export const Button = ({
  className,

  onClick,
  children,
  px,
  theme,
}: TButtonProps) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${theme ? "text-n-8" : "text-n-1"} ${className || ""}`;

  const spanClasses = "relative z-10";

  return (
    <button className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(theme)}
    </button>
  );
};
