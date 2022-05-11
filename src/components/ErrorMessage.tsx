import tw from 'tailwind-styled-components';

import CloseErrorMessage from '@/assets/icons/closeErrorMessage.svg';

const Message = tw.p`
  border-2 border-red-300 bg-red-200 text-red-500
  normal-case relative
  p-1 mt-1 rounded-md text-2xl
  font-medium md:font-bold text-center
`;

const CloseMessage = tw.img`
  absolute h-2 
  right-0.5 top-0.5
  cursor-pointer
`;

interface Props {
  errorMessage: string;
  closeMessage: () => void;
}
export const ErrorMessage = ({
  errorMessage,
  closeMessage,
}: Props): JSX.Element => (
  <Message>
    <CloseMessage
      alt="close"
      src={CloseErrorMessage}
      onClick={() => closeMessage()}
    />
    {errorMessage}
  </Message>
);
