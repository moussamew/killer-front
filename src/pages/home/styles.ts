import tw from 'tailwind-styled-components';

const Content = tw.div`
  max-w-screen-lg m-auto
  inset-0 px-2
`;

const WelcomeImage = tw.img`
  m-auto
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

const ErrorMessage = tw.p`
  normal-case bg-red-200 text-red-500 
  p-1 mt-1 rounded-md text-2xl font-bold
`;

const Actions = tw.div`
  mt-1
`;

export {
  Content,
  WelcomeImage,
  Text,
  PseudoSection,
  PseudoRow,
  ErrorMessage,
  Actions,
};
