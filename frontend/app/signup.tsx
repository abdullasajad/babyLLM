import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, Card, useTheme, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const theme = useTheme();
  const router = useRouter();
  const { signUp } = useAuth();

  const handleSignup = async () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await signUp(email.trim().toLowerCase(), password);
      router.back(); // Go back to previous screen
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const passwordsMatch = password === confirmPassword;
  const isPasswordValid = password.length >= 6;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Text variant="headlineLarge" style={[styles.title, { color: theme.colors.primary }]}>
            Join babyLLM
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Create your account to get started
          </Text>
        </View>

        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <TextInput
              mode="outlined"
              label="Name (Optional)"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
              style={styles.input}
              disabled={isLoading}
            />

            <TextInput
              mode="outlined"
              label="Email*"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              style={styles.input}
              error={email.length > 0 && !isValidEmail(email)}
              disabled={isLoading}
            />
            <HelperText type="error" visible={email.length > 0 && !isValidEmail(email)}>
              Please enter a valid email address
            </HelperText>

            <TextInput
              mode="outlined"
              label="Password*"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="new-password"
              style={styles.input}
              error={password.length > 0 && !isPasswordValid}
              right={
                <TextInput.Icon 
                  icon={showPassword ? "eye-off" : "eye"} 
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              disabled={isLoading}
            />
            <HelperText type="error" visible={password.length > 0 && !isPasswordValid}>
              Password must be at least 6 characters long
            </HelperText>

            <TextInput
              mode="outlined"
              label="Confirm Password*"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoComplete="new-password"
              style={styles.input}
              error={confirmPassword.length > 0 && !passwordsMatch}
              right={
                <TextInput.Icon 
                  icon={showConfirmPassword ? "eye-off" : "eye"} 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
              disabled={isLoading}
            />
            <HelperText type="error" visible={confirmPassword.length > 0 && !passwordsMatch}>
              Passwords do not match
            </HelperText>

            {error ? (
              <HelperText type="error" visible={true} style={styles.errorText}>
                {error}
              </HelperText>
            ) : null}

            <Button
              mode="contained"
              onPress={handleSignup}
              loading={isLoading}
              disabled={
                isLoading || 
                !email.trim() || 
                !password.trim() || 
                !confirmPassword.trim() ||
                !isValidEmail(email) ||
                !isPasswordValid ||
                !passwordsMatch
              }
              style={styles.signupButton}
              contentStyle={styles.buttonContent}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <View style={styles.divider}>
              <Text variant="bodyMedium" style={styles.dividerText}>
                Already have an account?
              </Text>
            </View>

            <Button
              mode="outlined"
              onPress={() => router.push('/login')}
              disabled={isLoading}
              style={styles.loginButton}
            >
              Sign In
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
  },
  card: {
    borderRadius: 16,
    elevation: 4,
  },
  cardContent: {
    padding: 24,
  },
  input: {
    marginBottom: 8,
  },
  errorText: {
    marginBottom: 16,
  },
  signupButton: {
    marginTop: 16,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  divider: {
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerText: {
    color: '#666',
  },
  loginButton: {
    borderRadius: 8,
  },
});

export default SignupScreen;
