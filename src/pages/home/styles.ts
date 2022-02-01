import tw from 'tailwind-styled-components';

const Content = tw.div`
  max-w-screen-lg m-auto absolute
  inset-0 p-2 h-1/2
`;

const Text = tw.p`
  my-2
`;

const PseudoSection = tw.section`
  mt-2 mb-1
`;

const PseudoRow = tw.div`
  mt-2 flex flex-row 
  justify-center items-center
`;

const PseudoButton = tw.button`
  p-1 ml-1 rounded-md bg-green-400
  w-2/3 md:w-1/3 text-3xl text-white
`;

const ButtonText = tw.p`
  font-bold uppercase
`;

const PseudoInput = tw.input`
  w-full p-1 text-3xl rounded-md
  border-solid border-2 border-light-blue-500
  focus-visible:border-amber-800
  focus-visible:outline-0
`;

const ErrorMessage = tw.p`
  normal-case bg-red-500 text-white 
  p-1 mt-1 rounded-md
`;

export {
  Content,
  Text,
  PseudoSection,
  PseudoRow,
  PseudoButton,
  ButtonText,
  PseudoInput,
  ErrorMessage,
};
