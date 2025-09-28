import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Text, 
  Card, 
  Switch, 
  Button, 
  Divider, 
  useTheme,
  List,
  Portal,
  Dialog,
  TextInput
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

const SettingsScreen = () => {
  const [preferences, setPreferences] = useState({
    theme: 'auto',
    language: 'en',
    resultsPerPage: 10,
    enableNotifications: true,
    enableAnalytics: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [showResultsDialog, setShowResultsDialog] = useState(false);
  const [tempResultsPerPage, setTempResultsPerPage] = useState('10');
  
  const theme = useTheme();
  const router = useRouter();
  const { token, signOut } = useAuth();

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      // TODO: Save preferences to backend
      Alert.alert('Success', 'Preferences saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => {
            signOut();
            router.back();
          }
        },
      ]
    );
  };

  const themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Auto', value: 'auto' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        <Card.Title title="Appearance" />
        <Card.Content>
          <List.Item
            title="Theme"
            description={themeOptions.find(t => t.value === preferences.theme)?.label}
            left={(props) => <List.Icon {...props} icon="palette" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => setShowThemeDialog(true)}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Search Preferences" />
        <Card.Content>
          <List.Item
            title="Results per page"
            description={`${preferences.resultsPerPage} results`}
            left={(props) => <List.Icon {...props} icon="format-list-numbered" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {
              setTempResultsPerPage(preferences.resultsPerPage.toString());
              setShowResultsDialog(true);
            }}
          />
          
          <Divider style={styles.divider} />
          
          <List.Item
            title="Enable notifications"
            description="Get notified about search updates"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={preferences.enableNotifications}
                onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, enableNotifications: value }))
                }
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Privacy" />
        <Card.Content>
          <List.Item
            title="Analytics"
            description="Help improve babyLLM by sharing usage data"
            left={(props) => <List.Icon {...props} icon="chart-line" />}
            right={() => (
              <Switch
                value={preferences.enableAnalytics}
                onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, enableAnalytics: value }))
                }
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Account" />
        <Card.Content>
          <List.Item
            title="Clear search history"
            description="Remove all saved searches"
            left={(props) => <List.Icon {...props} icon="history" />}
            onPress={() => {
              Alert.alert(
                'Clear History',
                'This will permanently delete your search history. Continue?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Clear', style: 'destructive', onPress: () => {} },
                ]
              );
            }}
          />
          
          <Divider style={styles.divider} />
          
          <List.Item
            title="Sign out"
            description="Sign out of your account"
            left={(props) => <List.Icon {...props} icon="logout" />}
            onPress={handleSignOut}
          />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSavePreferences}
          loading={isLoading}
          disabled={isLoading}
          style={styles.saveButton}
        >
          Save Preferences
        </Button>
      </View>

      {/* Theme Selection Dialog */}
      <Portal>
        <Dialog visible={showThemeDialog} onDismiss={() => setShowThemeDialog(false)}>
          <Dialog.Title>Choose Theme</Dialog.Title>
          <Dialog.Content>
            {themeOptions.map((option) => (
              <List.Item
                key={option.value}
                title={option.label}
                left={() => (
                  <List.Icon 
                    icon={preferences.theme === option.value ? "radiobox-marked" : "radiobox-blank"} 
                  />
                )}
                onPress={() => {
                  setPreferences(prev => ({ ...prev, theme: option.value }));
                  setShowThemeDialog(false);
                }}
              />
            ))}
          </Dialog.Content>
        </Dialog>
      </Portal>

      {/* Results Per Page Dialog */}
      <Portal>
        <Dialog visible={showResultsDialog} onDismiss={() => setShowResultsDialog(false)}>
          <Dialog.Title>Results Per Page</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="Number of results"
              value={tempResultsPerPage}
              onChangeText={setTempResultsPerPage}
              keyboardType="numeric"
              style={styles.input}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowResultsDialog(false)}>Cancel</Button>
            <Button 
              onPress={() => {
                const num = parseInt(tempResultsPerPage);
                if (num >= 5 && num <= 50) {
                  setPreferences(prev => ({ ...prev, resultsPerPage: num }));
                  setShowResultsDialog(false);
                } else {
                  Alert.alert('Invalid Input', 'Please enter a number between 5 and 50');
                }
              }}
            >
              Save
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  divider: {
    marginVertical: 8,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  saveButton: {
    borderRadius: 8,
  },
  input: {
    marginTop: 8,
  },
});

export default SettingsScreen;
