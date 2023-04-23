import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import styles from './index.module.css';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your application!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
