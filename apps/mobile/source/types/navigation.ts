import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  CreateRoom: undefined;
  JoinRoom: undefined;
  PendingRoom: { roomCode: string };
  PlayingRoom: { roomCode: string };
  EndedRoom: { roomCode: string };
};

export type StackNavigation = NativeStackNavigationProp<RootStackParamList>;
