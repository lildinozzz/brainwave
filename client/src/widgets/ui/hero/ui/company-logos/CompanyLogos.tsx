import { companyLogos } from '../../assets';

type TCompanyLogosProps = {
  className?: string;
};

export const CompanyLogos = ({ className = '' }: TCompanyLogosProps) => {
  return (
    <div className={`${className}`}>
      <h5 className='tagline mb-6 text-center text-n-1/50 '>
        Helping people create beautiful content at
      </h5>
      <ul className='flex '>
        {companyLogos.map((logo, index) => (
          <li
            className='flex items-center justify-center flex-1 h-[8.5rem] '
            key={index}
          >
            <img width={134} height={28} src={logo} alt={logo} />
          </li>
        ))}
      </ul>
    </div>
  );
};
