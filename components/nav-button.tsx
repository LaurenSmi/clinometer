import { Button } from "@react-navigation/elements";
import { StyleSheet } from "react-native";

interface NavButtonProps {
  onClick: () => void;
  isDisabled: boolean;
  text: string;
}

export function NavButton({ onClick, isDisabled, text }: NavButtonProps) {
  return (
    <Button
      onPress={onClick}
      disabled={isDisabled}
      color="white"
      style={[styles.button, isDisabled && styles.buttonDisabled]}
    >
      {text}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#074025",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#475e52",
    opacity: 0.6,
  },
});
