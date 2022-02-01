import tw from 'tailwind-styled-components';

const Content = tw.div<{ $focusable: boolean }>`
  ${({ $focusable }): string =>
    $focusable ? 'transition duration-200 ease-in-out hover:shadow-lg' : ''}
  shadow-md rounded-lg  w-full mx-2
  p-2 my-2 bg-white
`;

export { Content };
