import tw from 'tailwind-styled-components';

import CloseAlertMessage from '@/assets/icons/closeAlertMessage.svg';

const Message = tw.p`
  border-2 border-green-300 bg-green-200 text-green-500
  normal-case relative
  p-1 mt-1 rounded-md text-2xl
  font-medium md:font-bold text-center
`;

const CloseIcon = tw.img`
  absolute h-2 
  right-0.5 top-0.5
  cursor-pointer
`;

interface Props {
  message: string;
  closeMessage?: () => void;
}

export function AlertMessage({ message, closeMessage }: Props): JSX.Element {
  return (
    <Message>
      {closeMessage && (
        <CloseIcon
          alt="closeAlertMessage"
          src={CloseAlertMessage}
          onClick={() => closeMessage()}
        />
      )}
      {message}
    </Message>
  );
}
