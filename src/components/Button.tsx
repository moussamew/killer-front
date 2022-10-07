import { useContext, useState } from 'react';
import tw from 'tailwind-styled-components';

import { isPromise } from '@/helpers/utils';
import { ModalContext } from '@/hooks/context/modal';

import { ErrorMessage } from './ErrorMessage';
import { Spinner } from './Spinner';

const Content = tw.div`
  flex flex-col w-full
`;

const StyledButton = tw.button`
  ${({ $buttonColor }: { $buttonColor: string }): string => $buttonColor}
  ${({ disabled }: { disabled: boolean }): string =>
    disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
    
  transition-all duration-300 ease-in 
  shadow-md hover:shadow-xl
  p-1 mt-1 rounded-lg 
  w-full text-3xl relative
  flex justify-center item-center
`;

const Text = tw.p`
  ${({ $textColor }: { $textColor: string }): string => $textColor}
  font-medium text-3xl
`;

const Icon = tw.img`
  h-2.5 absolute left-1.5
`;

interface Props {
  content: string;
  onClick: () => void | Promise<void>;
  buttonColor?: string;
  textColor?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  icon?: string;
}

export const Button = ({
  content,
  buttonColor = 'bg-red-400',
  textColor = 'text-white',
  onClick,
  type = 'button',
  disabled = false,
  icon,
}: Props): JSX.Element => {
  const { modal, closeModal } = useContext(ModalContext);

  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const cleanModal = (): void => {
    if (modal) {
      closeModal();
    }
  };

  const cleanErrorMessage = (): void => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleClick = async (): Promise<void> => {
    if (isPromise(onClick)) {
      setLoading(true);

      return onClick()
        .then(() => {
          setLoading(false);
          cleanErrorMessage();
          cleanModal();
        })
        .catch((error) => {
          setLoading(false);
          setErrorMessage(error.message);
        });
    }

    onClick();

    return cleanModal();
  };

  return (
    <Content>
      <StyledButton
        onClick={handleClick}
        type={type}
        $buttonColor={buttonColor}
        disabled={isLoading || disabled}
      >
        {icon && !isLoading && <Icon alt={content} src={icon} />}
        {isLoading && <Spinner />}
        <Text $textColor={textColor}>{content}</Text>
      </StyledButton>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          closeMessage={() => setErrorMessage(null)}
        />
      )}
    </Content>
  );
};
