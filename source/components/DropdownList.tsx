import { useState } from 'react';
import tw from 'twin.macro';

import ActiveIcon from '@/assets/icons/active.svg';
import ExpandIcon from '@/assets/icons/expand.svg';

const Content = tw.div`
  p-1 mt-1 text-3xl 
  rounded-md bg-white border-solid 
  border-2 border-blue-100 relative
`;

const Dropdown = tw.div`
  flex flex-row justify-between
`;

const List = tw.div`
  absolute bg-white 
  mt-2 shadow-xl rounded-md
  w-full left-0
`;

const Item = tw.div`
  p-1 text-3xl hover:bg-gray-100
  flex flex-row justify-between
`;

interface Props {
  currentItem: string;
  itemList: string[];
  actionOnClick: (item: string) => void;
}

export function DropdownList({
  currentItem,
  itemList,
  actionOnClick,
}: Props): JSX.Element {
  const [isListOpen, openList] = useState(false);

  const handleOpenList = (): void => {
    openList(!isListOpen);
  };

  const handleClick = (item: string) => () => {
    actionOnClick(item);
    openList(false);
  };

  return (
    <Content>
      <Dropdown onClick={handleOpenList}>
        <p>{currentItem}</p>
        <ExpandIcon />
      </Dropdown>
      {isListOpen && (
        <List>
          {itemList.map((item) => (
            <Item key={item} onClick={handleClick(item)}>
              <p>{item}</p>
              {item === currentItem && <ActiveIcon />}
            </Item>
          ))}
        </List>
      )}
    </Content>
  );
}
