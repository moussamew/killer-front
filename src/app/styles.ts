import tw from 'tailwind-styled-components';

const Content = tw.div`
  md:mt-10 mx-auto max-w-screen-md
  p-2
`;

const Text = tw.p`
  my-3
`;

const PseudoSection = tw.section`
  my-2
`;

const Input = tw.input`
  w-full p-1 text-3xl
  mt-2 rounded-md
  border-solid border-2 border-light-blue-500
  focus-visible:border-amber-800
  focus-visible:outline-0
`;

export { Content, Text, PseudoSection, Input };
