import tw from 'tailwind-styled-components';

const Content = tw.div`
  mt-2 flex flex-row items-center
`;

const StyledInput = tw.input`
  w-full p-1 text-3xl rounded-md
  border-solid border-2 border-light-blue-500
  focus-visible:border-amber-800
  focus-visible:outline-0
`;

const StyledLabel = tw.label`
  min-w-max	mr-2
`;

export { Content, StyledInput, StyledLabel };
