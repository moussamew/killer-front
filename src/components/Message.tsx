import tw from 'tailwind-styled-components';

import CloseErrorMessage from '@/assets/icons/closeErrorMessage.svg';
import CloseSuccessMessage from '@/assets/icons/closeSuccessMessage.svg';

const StyledMessage = tw.p<{
  $errorMessage?: string;
  $successMessage?: string;
}>`
  ${({ $errorMessage }) =>
    $errorMessage && 'border-2 border-red-300 bg-red-200 text-red-500'}

  ${({ $successMessage }) =>
    $successMessage && 'border-2 border-green-300 bg-green-200 text-green-500'}

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
  errorMessage?: string;
  successMessage?: string;
  closeMessage?: () => void;
}

export const Message = ({
  errorMessage,
  successMessage,
  closeMessage,
}: Props): JSX.Element => {
  return (
    <StyledMessage
      $errorMessage={errorMessage}
      $successMessage={successMessage}
    >
      <CloseMessage
        alt="close"
        src={errorMessage ? CloseErrorMessage : CloseSuccessMessage}
        onClick={() => closeMessage?.()}
      />
      {errorMessage || successMessage}
    </StyledMessage>
  );
};
