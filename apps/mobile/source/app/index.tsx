import { setupIntl } from '@killerparty/intl';
import { WebServicesProvider } from '@killerparty/webservices';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { Routes } from './routes';

import 'intl-pluralrules';

setupIntl('fr-FR');

export function App(): JSX.Element {
  return (
    <>
      <NavigationContainer>
        <WebServicesProvider>
          <Routes />
        </WebServicesProvider>
      </NavigationContainer>
      <StatusBar />
    </>
  );
}
