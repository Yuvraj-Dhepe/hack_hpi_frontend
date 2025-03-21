import { StyleSheet } from 'react-native';

// Define your global color scheme and other constants3

export const COLORS = {
  background: "#f5f4f9",
    yellow: "#f2dd8e",
    beige: "#f2dd8e",
    lightblue: "#bfc9f8",
    red: "#bfc9f8",
    green: "#bfc9f8",
    blue: "#bfc9f8",
    offwhite: "#bfc9f8",
    white: "#ffffff",
    black: "#131313",
    darkbeige: "#eddbd1",
    textPrimary: "#131313",
    textSecondary: "#131313",
};

// Global Styles
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.offwhite,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.textPrimary,
    fontSize: 18,
  },
  input:{
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: COLORS.background,
    borderColor: COLORS.textPrimary,
    borderWidth: 1
  }
});
