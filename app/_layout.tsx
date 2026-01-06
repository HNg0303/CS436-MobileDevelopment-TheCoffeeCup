import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';

export default function Layout() {
  return (
    <SQLiteProvider databaseName="TheCodeCup.db" assetSource={{ assetId: require('../database/CodeCup.db') }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}
