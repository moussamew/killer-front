import { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import tw from 'tailwind-styled-components';

import { Message } from './Message';

const Content = tw.div`
  flex flex-col w-full 
  mt-1
`;

const StyledInput = tw.input<{ $uppercase?: boolean }>`
  ${({ $uppercase }): string => ($uppercase ? 'uppercase' : 'normal-case')}

  p-1 text-3xl rounded-md
  border-solid border-2 border-light-blue-800
  transition duration-100 ease-in 
  focus-visible:border-blue-300
  focus-visible:outline-0
`;

const StyledLabel = tw.label`
  font-bold text-lightDark pb-1
`;

interface Props {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  uppercase?: boolean;
}

const InputRef = (
  {
    id,
    value,
    onChange,
    type = 'text',
    placeholder,
    label,
    errorMessage,
    uppercase,
  }: Props,
  ref: ForwardedRef<HTMLInputElement>,
): JSX.Element => (
  <Content>
    {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
    <StyledInput
      id={id}
      value={value}
      onChange={onChange}
      ref={ref}
      type={type}
      placeholder={placeholder}
      autoComplete="off"
      $uppercase={uppercase}
    />
    {errorMessage && <Message errorMessage={errorMessage} />}
  </Content>
);

export const Input = forwardRef(InputRef);
