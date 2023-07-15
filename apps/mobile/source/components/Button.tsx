import { Pressable, Text } from 'react-native';

import styles from './styles/Button.module.css';

interface Props {
  onPress: () => void;
  color: 'primary' | 'secondary';
  text: string;
  disabled?: boolean;
}

export function Button({ onPress, color, text, disabled }: Props): JSX.Element {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        styles[color],
        pressed && color === 'primary' && styles.primaryPressed,
        pressed && color === 'secondary' && styles.secondaryText,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          color === 'primary' && styles.primaryText,
          color === 'secondary' && styles.secondaryText,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}
