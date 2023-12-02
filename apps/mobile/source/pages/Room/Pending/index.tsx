/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import InfosIcon from '../../../assets/icons/infos.svg';
import { type RootStackParamList } from '../../../types/navigation';

import { RoomInfos } from './RoomInfos';

const Tab = createBottomTabNavigator<RootStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList, 'PendingRoom'>;

export function PendingRoomTabs({ route }: Props): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FDF1E6',
          borderTopWidth: 1,
        },
        tabBarItemStyle: {
          marginTop: 20,
        },
        tabBarLabelStyle: { fontSize: 12, marginTop: 15 },
        tabBarActiveTintColor: '#474D52',
      }}
      initialRouteName="RoomInfos"
      sceneContainerStyle={{ backgroundColor: '#fdf7f2' }}
    >
      <Tab.Screen
        name="RoomInfos"
        component={RoomInfos}
        initialParams={{
          roomCode: route.params.roomCode,
          routeName: 'PendingRoom',
        }}
        options={{
          tabBarIcon: ({ color }) => <InfosIcon fill={color} />,
          tabBarLabel: 'Informations',
        }}
      />
    </Tab.Navigator>
  );
}
