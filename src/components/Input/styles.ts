import tw from 'tailwind-styled-components';

const Content = tw.div`
  flex flex-col w-full mt-1
`;

const StyledInput = tw.input`
  p-1 text-3xl rounded-md
  border-solid border-2 border-light-blue-800
  transition duration-100 ease-in 
  focus-visible:border-blue-300
  focus-visible:outline-0
`;

const StyledLabel = tw.label`
  font-bold text-lightDark pb-1
`;

export { Content, StyledInput, StyledLabel };
