import tw from 'tailwind-styled-components';

const StyledButton = tw.button<{
  $buttonColor: string;
  disabled: boolean;
}>`
  ${({ $buttonColor }): string => $buttonColor}
  ${({ disabled }): string =>
    disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'}

  transition-shadow duration-500 ease-in 
  shadow-md
  p-1 my-0.5 rounded-lg 
  w-full text-3xl
`;

const Text = tw.p<{ $textColor: string }>`
  ${({ $textColor }): string => $textColor}

  font-medium text-3xl
`;

export { StyledButton, Text };
