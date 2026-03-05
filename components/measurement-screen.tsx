import { StyleSheet } from "react-native";

import { AccelerometerComponent } from "@/components/accelerometer-component";
import { Camera } from "@/components/camera";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import BasicView from "./basic-view";
import { NavButton } from "./nav-button";

export default function MeasurementScreen({
  text,
  onCapture,
}: {
  text: string;
  onCapture: (accelerometerData: { x: number; y: number; z: number }) => void;
}) {
  const [currentAccelerometerData, setCurrentAccelerometerData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  return (
    <BasicView>
      <ThemedView style={styles.textContainer}>
        <ThemedText>{text}</ThemedText>
      </ThemedView>

      <ThemedView style={{ aspectRatio: 1, width: "100%" }}>
        <Camera />
        <AccelerometerComponent onDataChange={setCurrentAccelerometerData} />
      </ThemedView>

      <NavButton
        onClick={() => onCapture(currentAccelerometerData)}
        text="Capture"
      />
    </BasicView>
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
