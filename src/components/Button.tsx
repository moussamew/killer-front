import { useState } from 'react';
import { toast } from 'react-hot-toast';
import tw, { styled } from 'twin.macro';

import { errorStyle } from '@/constants/styles';
import { colors, text } from '@/constants/tailwind';
import { isPromise } from '@/helpers/utils';

import { Spinner } from './Spinner';

const Content = tw.div`
  flex flex-col w-full
`;

const StyledButton = styled.button<{
  buttonColor: keyof typeof colors;
  disabled: boolean;
}>`
  ${({ buttonColor }) => colors[buttonColor]}
  ${({ disabled }) =>
    disabled ? tw`cursor-not-allowed opacity-70` : tw`cursor-pointer`}
    
  ${tw`transition-all duration-300 ease-in 
  shadow-md hover:shadow-xl
  p-1 mt-1 rounded-lg
  w-full text-3xl relative
  flex justify-center items-center`}
`;

const Text = styled.p<{ textColor: keyof typeof text }>`
  ${({ textColor }) => text[textColor]}

  ${tw`font-medium text-3xl`}
`;

const Icon = tw.img`
  h-2.5 absolute left-1.5
`;

interface Props {
  content: string;
  onClick: () => void | Promise<void>;
  buttonColor?: keyof typeof colors;
  textColor?: keyof typeof text;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  icon?: string;
}

export function Button({
  content,
  buttonColor = 'red',
  textColor = 'white',
  onClick,
  type = 'button',
  disabled = false,
  icon,
}: Props): JSX.Element {
  const [isLoading, setLoading] = useState(false);

  const handleClick = async (): Promise<void> => {
    if (isPromise(onClick)) {
      setLoading(true);

      return onClick()
        .catch((error) => {
          toast.error(error.message, errorStyle);
        })
        .finally(() => setLoading(false));
    }

    return onClick();
  };

  return (
    <Content>
      <StyledButton
        onClick={handleClick}
        type={type}
        buttonColor={buttonColor}
        disabled={isLoading || disabled}
      >
        {icon && !isLoading && <Icon alt={content} src={icon} />}
        {isLoading && <Spinner />}
        <Text textColor={textColor}>{content}</Text>
      </StyledButton>
    </Content>
  );
}
