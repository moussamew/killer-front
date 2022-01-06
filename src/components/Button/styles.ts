import tw from 'tailwind-styled-components';

const Content = tw.button<{ $buttonColor: string }>`
  ${({ $buttonColor }): string => $buttonColor}

  transition duration-500 ease-in-out 
  p-1.5 my-0.5 rounded-lg 
  w-full text-3xl text-white
`;

const Text = tw.p`
  font-bold uppercase
`;

export { Content, Text };
