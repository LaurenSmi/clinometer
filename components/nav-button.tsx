import { Text as RText, StyleSheet, TouchableOpacity } from "react-native";

interface NavButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
  text: string;
}

export function NavButton({ onClick, isDisabled, text }: NavButtonProps) {
  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={isDisabled}
      style={[styles.button, isDisabled && styles.buttonDisabled]}
    >
      <RText style={styles.buttonText}>{text}</RText>
    </TouchableOpacity>
  );
}
``;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#88A974",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 13,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 220,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 30,
    color: "white",
  },
});
