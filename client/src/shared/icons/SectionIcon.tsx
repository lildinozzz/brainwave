import { PlusIcon } from './PlusIcon';

type TSectionIconProps = {
  crossesOffset?: string;
};

export const SectionIcon = ({ crossesOffset }: TSectionIconProps) => {
  return (
    <>
      <PlusIcon
        className={`hidden absolute -top-[0.3125rem] left-[1.5625rem] ${
          crossesOffset && crossesOffset
        } pointer-events-none lg:block xl:left-[2.1875rem]`}
      />

      <PlusIcon
        className={`hidden absolute  -top-[0.3125rem] right-[1.5625rem] ${
          crossesOffset && crossesOffset
        } pointer-events-none lg:block xl:right-[2.1875rem]`}
      />
    </>
  );
};
