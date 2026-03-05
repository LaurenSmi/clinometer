import { StyleSheet } from "react-native";

import { AccelerometerComponent } from "@/components/accelerometer-component";
import { Camera } from "@/components/camera";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function MeasurementScreen({ text }: { text: string }) {
  return (
    <>
      <ThemedView style={styles.textContainer}>
        <ThemedText>{text}</ThemedText>
      </ThemedView>

      <ThemedView style={{ aspectRatio: 1, width: "100%" }}>
        <Camera />
        <AccelerometerComponent />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  textContainer: {
    padding: 16,
    gap: 8,
  },
});
