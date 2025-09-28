import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const { token, signOut } = useAuth();

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      // Navigate to search results page with the query
      router.push({
        pathname: '/search',
        params: { q: query }
      });
    } catch (error) {
      console.error('Search error:', error);
      // TODO: Show error to user
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text variant="headlineMedium" style={styles.title}>babyLLM</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>Enhanced search powered by AI</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          mode="outlined"
          placeholder="Ask me anything..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          style={styles.searchInput}
          right={
            <TextInput.Icon 
              icon="magnify" 
              onPress={handleSearch} 
              disabled={isSearching || !query.trim()}
            />
          }
          autoCapitalize="none"
          autoCorrect={true}
          autoComplete="off"
          returnKeyType="search"
          disabled={isSearching}
        />
        
        <Button
          mode="contained"
          onPress={handleSearch}
          loading={isSearching}
          disabled={isSearching || !query.trim()}
          style={styles.searchButton}
          contentStyle={styles.searchButtonContent}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </View>

      <View style={styles.authContainer}>
        {token ? (
          <>
            <Button 
              mode="text" 
              onPress={() => router.push('/settings')}
              icon="cog"
            >
              Settings
            </Button>
            <Button 
              mode="outlined" 
              onPress={signOut}
              style={styles.authButton}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button 
              mode="text" 
              onPress={() => router.push('/login')}
              style={styles.authButton}
            >
              Log In
            </Button>
            <Button 
              mode="contained" 
              onPress={() => router.push('/signup')}
              style={styles.authButton}
            >
              Sign Up
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
  },
  searchContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  searchInput: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  searchButton: {
    borderRadius: 8,
  },
  searchButtonContent: {
    paddingVertical: 6,
  },
  authContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 12,
  },
  authButton: {
    minWidth: 120,
  },
});

export default HomeScreen;
