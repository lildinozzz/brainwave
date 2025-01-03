type TSelectPlanButton = {
  handleGoToPayment: () => void;
};
export const SelectPlanButton = ({ handleGoToPayment }: TSelectPlanButton) => {
  return (
    <button
      onClick={handleGoToPayment}
      className='text-black w-full h-[3rem] mt-4 cursor-pointer p-5 bg-white rounded-xl font-bold isabled:opacity-50 disabled:cursor-not-allowed disabled:animate-pulse flex justify-center items-center'
    >
      Continue
    </button>
  );
};
