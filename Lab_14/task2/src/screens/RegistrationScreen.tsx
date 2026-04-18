import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

export default function RegistrationScreen() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ email: '' });

  const validateEmail = useCallback((text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setForm((prev) => ({ ...prev, email: text }));
    if (text.length > 0 && !emailRegex.test(text)) {
      setErrors({ email: 'Invalid ALMAU email format' });
    } else {
      setErrors({ email: '' });
    }
  }, []);

  const handleRegister = () => {
    Keyboard.dismiss();
    if (!form.email || !form.password || !form.name) {
      Alert.alert('Error', 'Please fill all fields correctly.');
      return;
    }
    if (errors.email) {
      Alert.alert('Error', 'Please fix the email format.');
      return;
    }
    Alert.alert('Success', `Registration payload:\n${JSON.stringify(form, null, 2)}`);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.headerArea}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.subtitle}>Enter your ALMAU account details</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Askar Almatov"
              placeholderTextColor="#999"
              value={form.name}
              onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))}
              returnKeyType="next"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>ALMAU Email</Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder="id2024@almau.edu.kz"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={form.email}
              onChangeText={validateEmail}
              returnKeyType="next"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Secure Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Min 8 characters"
              placeholderTextColor="#999"
              secureTextEntry={true}
              value={form.password}
              onChangeText={(value) => setForm((prev) => ({ ...prev, password: value }))}
              returnKeyType="done"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.btn,
              (!form.email || !form.password || !form.name || !!errors.email) ? styles.btnDisabled : null,
            ]}
            onPress={handleRegister}
            disabled={!form.email || !form.password || !form.name || !!errors.email}
          >
            <Text style={styles.btnText}>Create Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { flexGrow: 1, padding: 30, justifyContent: 'center' },
  headerArea: { marginBottom: 34 },
  title: { fontSize: 32, fontWeight: '800', color: '#111111', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666666' },
  inputGroup: { marginBottom: 22 },
  label: { fontSize: 14, fontWeight: '600', color: '#444444', marginBottom: 8 },
  input: {
    height: 55,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333333',
  },
  inputError: { borderColor: '#DC3545', backgroundColor: '#FFF8F8' },
  errorText: { color: '#DC3545', fontSize: 12, marginTop: 6 },
  btn: {
    backgroundColor: '#0066CC',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#0066CC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  btnDisabled: { backgroundColor: '#A0C4E4', shadowOpacity: 0 },
  btnText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});
