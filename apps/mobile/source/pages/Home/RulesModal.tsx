import { View } from 'react-native';
import Modal from 'react-native-modal';

import { Rules } from './Rules';
import styles from './styles/RulesModal.module.css';

interface Props {
  isModalVisible: boolean;
  toggleModal: () => void;
}

export function RulesModal({
  isModalVisible,
  toggleModal,
}: Props): JSX.Element {
  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.container}
      swipeDirection="down"
      swipeThreshold={200}
      onSwipeComplete={toggleModal}
    >
      <View style={{ marginBottom: 140 }}>
        <Rules toggleModal={toggleModal} />
      </View>
    </Modal>
  );
}
