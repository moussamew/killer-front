import { useUpdatePlayer } from '@killerparty/webservices';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

import { Button } from '../../../../components/Button';
import { Header } from '../../../../components/Header';
import { Player } from '../../../../components/Player';
import {
  type StackNavigation,
  type RootStackParamList,
} from '../../../../types/navigation';

import styles from './styles/PlayerList.module.css';

type Props = NativeStackScreenProps<RootStackParamList, 'PlayerModal'>;

export function PlayerModal({ route }: Props): JSX.Element {
  const { updatePlayer } = useUpdatePlayer();
  const { popToTop } = useNavigation<StackNavigation>();
  const { player } = route.params;

  const handleKickPlayer = async (playerId: number): Promise<void> => {
    await updatePlayer.mutateAsync({ id: playerId, room: null });

    popToTop();
  };

  return (
    <>
      <Header shouldHandlePreviousPage={false} title="Informations du joueur" />
      <View style={{ margin: 20 }}>
        <LottieView
          source={require('../../../../assets/lotties/player-infos.json')}
          autoPlay
          style={styles.lottie}
          loop
        />
        <Player player={player} />
        <Button
          color="primary"
          text="Expulser ce joueur de la partie"
          onPress={() => handleKickPlayer(player.id)}
          isAsyncAction
        />
      </View>
    </>
  );
}
