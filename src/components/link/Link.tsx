import { Link as RouterLink } from 'react-router-dom';
import { ButtonSvg } from '../../assets/svg';

type TLinkProps = {
  className?: string;
  px?: string;
  theme?: boolean;
  href: string;
  children?: React.ReactNode;
};

export const Link = ({ className, px, theme, href, children }: TLinkProps) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || 'px-7'
  } ${theme ? 'text-n-8' : 'text-n-1'} ${className || ''}`;

  const spanClasses = 'relative z-10';

  return (
    <RouterLink to={href} className={classes}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(theme)}
    </RouterLink>
  );
};
