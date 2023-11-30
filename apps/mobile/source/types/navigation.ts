import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  CreateRoom: undefined;
  JoinRoom: undefined;
  ChoosePseudo: undefined;
  ChooseRoom: { playerId: number };
  ChooseAvatar: { playerId: number };
  PendingRoom: { roomCode: string };
  PlayingRoom: { roomCode: string };
  EndedRoom: { roomCode: string };
};

export type StackNavigation = NativeStackNavigationProp<RootStackParamList>;
