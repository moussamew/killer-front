import { ChangeEvent, RefObject } from 'react';

import { Content, StyledLabel, StyledInput } from './styles';

interface Props {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  ref?: RefObject<HTMLElement>;
  type?: string;
  placeholder?: string;
  label?: string;
}

const Input = ({
  id,
  value,
  onChange,
  ref,
  type = 'text',
  placeholder,
  label,
}: Props): JSX.Element => (
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
    />
  </Content>
);

export default Input;
