import { useRef } from 'react';
import { Animated, Pressable, Text } from 'react-native';

import styles from './styles/Button.module.css';

interface Props {
  onPress: () => void;
  color: 'primary' | 'secondary';
  text: string;
  disabled?: boolean;
}

export function Button({ onPress, color, text, disabled }: Props): JSX.Element {
  const focusAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = (): void => {
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = (): void => {
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange:
      color === 'primary' ? ['#474D52', '#2F3337'] : ['#8A8EA8', '#6C7294'],
  });

  return (
    <Animated.View
      style={[styles.content, disabled && styles.disabled, { backgroundColor }]}
    >
      <Pressable
        style={styles.button}
        onPress={onPress}
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
}
