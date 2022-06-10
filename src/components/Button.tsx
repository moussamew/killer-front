import tw from 'tailwind-styled-components';

const Content = tw.div`
  flex flex-col w-full
`;

const StyledButton = tw.button<{
  $buttonColor: string;
  disabled: boolean;
}>`
  ${({ $buttonColor }): string => $buttonColor}
  ${({ disabled }): string =>
    disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
    
  transition-all duration-300 ease-in 
  shadow-md hover:shadow-xl
  p-1 mt-1 rounded-lg 
  w-full text-3xl relative
  flex justify-center item-center
`;

const Text = tw.p<{ $textColor: string }>`
  ${({ $textColor }): string => $textColor}
  font-medium text-3xl
`;

const Icon = tw.img`
  h-2.5 absolute left-1.5
`;

interface Props {
  content: string;
  buttonColor?: string;
  textColor?: string;
  onClick?: () => void;
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
}: Props): JSX.Element => (
  <Content>
    <StyledButton
      onClick={onClick}
      type={type}
      $buttonColor={buttonColor}
      disabled={disabled}
    >
      {icon && <Icon alt={content} src={icon} />}
      <Text $textColor={textColor}>{content}</Text>
    </StyledButton>
  </Content>
);
