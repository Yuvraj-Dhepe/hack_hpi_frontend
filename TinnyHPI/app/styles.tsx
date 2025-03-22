import { StyleSheet } from 'react-native';

// Define your global color scheme and other constants3

export const COLORS = {
    background: "#f2f2f2",
  backgroundGrey: "#f5f4f9",
    yellow: "#f2dd8e",
    beige: "#f1e6df",
    lightblue: "#bfc9f8",
    red: "#bfc9f8",
    green: "#bfc9f8",
    blue: "#bfc9f8",
    offwhite: "#fdfdfd",
    white: "#ffffff",
    black: "#131313",
    darkbeige: "#eddbd1",
    textPrimary: "#131313",
    textSecondary: "#131313",
    darkYellow: "#c9b255"
};

// Global Styles
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 24,
    fontWeight: 'thin',
    color: COLORS.textPrimary,
  },
  titleBold: {
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  button: {
    backgroundColor: COLORS.beige,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row', // Arrange elements side by side
    flexWrap: 'wrap', // Allow wrapping when needed
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10, // Add spacing between elements
    marginBottom: 10,
    backgroundColor: COLORS.background,
  },
  text: {
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  buttonText: {
    color: COLORS.textPrimary,
    fontSize: 18,
  },
  input:{
    padding: 10,
    margin: 5,
    borderRadius: 15,
    backgroundColor: COLORS.offwhite,
    borderWidth: 0
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
    buttonGroupButton: {
        backgroundColor: COLORS.offwhite,
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        width: '45%',
    },
    optionButton: {
        backgroundColor: COLORS.offwhite,
        padding: 15,
        margin: 5,
        borderRadius: 25,
        alignItems: 'center',
        width: '16%',
    },
    buttonGroupWide: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonGroupWideButton: {
        backgroundColor: COLORS.offwhite,
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        width: '45%',
    },
    optionButtonWide: {
        backgroundColor: COLORS.offwhite,
        padding: 15,
        margin: 5,
        borderRadius: 25,
        alignItems: 'center',
        width: '30%',
    },
    optionButtonSelected: {
        backgroundColor: COLORS.yellow,
    },
    intervention: {
        fontSize: 18,
        marginBottom: 10,
      },
      barContainer: {
        backgroundColor: COLORS.beige, // Change the color of the bar container as needed
        borderRadius: 5,
        height: 20,
        marginBottom: 10,
        overflow: 'hidden', // Ensures the bar does not overflow
      },
      bar: {
        backgroundColor: COLORS.red, // Change the color of the bar as needed
        height: '100%',
      },
});
