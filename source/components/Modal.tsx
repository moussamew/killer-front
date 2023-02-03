import { type ReactNode } from 'react';
import tw from 'twin.macro';

import { ReactComponent as CloseIcon } from '@/assets/icons/close.svg';

const Background = tw.div`
  bg-disabled fixed top-0
  w-full h-full
`;

const Content = tw.div`
  relative bg-brand m-auto
  p-2 mx-2 top-1/3 
  md:mx-1/4 lg:mx-1/3 xl:mx-2/5
`;

const Icon = tw.div`
  absolute cursor-pointer h-2
  top-0.5 right-0.5
`;

interface Props {
  children: ReactNode;
  closeModal: () => void;
}

export function Modal({ children, closeModal }: Props): JSX.Element {
  return (
    <Background>
      <Content>
        <Icon onClick={closeModal}>
          <CloseIcon title="closeModal" />
        </Icon>
        {children}
      </Content>
    </Background>
  );
}
