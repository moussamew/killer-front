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

const PseudoRow = tw.div`
  mt-2 flex flex-row 
  justify-center items-center
`;

const PseudoButton = tw.button`
  p-1 ml-1 rounded-md bg-green-400
  w-1/10 text-3xl text-white
`;

const PseudoInput = tw.input`
  w-full p-1 text-3xl
  rounded-md
  border-solid border-2 border-light-blue-500
  focus-visible:border-amber-800
  focus-visible:outline-0
`;

export { Content, Text, PseudoSection, PseudoRow, PseudoButton, PseudoInput };
