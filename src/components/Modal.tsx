import { ReactNode } from 'react';
import tw from 'tailwind-styled-components';

import Close from '@/assets/icons/close.svg';

const Background = tw.div`
  bg-disabled fixed top-0
  w-full h-full
`;

const Content = tw.div`
  relative bg-brand m-auto
  p-2 mx-2 top-1/3 
  md:mx-1/4 lg:mx-1/3 xl:mx-2/5
`;

const CloseIcon = tw.img`
  absolute cursor-pointer h-3
  -top-1 -right-1
`;

interface Props {
  children: ReactNode;
  closeModal: () => void;
}

const Modal = ({ children, closeModal }: Props): JSX.Element => (
  <Background>
    <Content>
      <CloseIcon alt="closeModal" src={Close} onClick={closeModal} />
      {children}
    </Content>
  </Background>
);

export default Modal;
