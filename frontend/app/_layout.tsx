import { Stack } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'babyLLM',
            headerStyle: { backgroundColor: '#4a6fa5' },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="search" 
          options={{ 
            title: 'Search Results',
            headerBackTitle: 'Back'
          }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ 
            title: 'Log In',
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="signup" 
          options={{ 
            title: 'Create Account',
            presentation: 'modal'
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            title: 'Settings',
            presentation: 'modal'
          }} 
        />
      </Stack>
    </AuthProvider>
  );
}
