import { Camera } from "@/components/camera";
import { ThemedText } from "@/components/themed-text";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useAccelerometer } from "../hooks/use-accelerometer";
import BasicView from "./basic-view";
import { NavButton } from "./nav-button";

export default function MeasurementScreen({
  text,
  onCapture,
}: {
  text: React.ReactNode;
  onCapture: (accelerometerData: { x: number; y: number; z: number }) => void;
}) {
  const [orientation, setOrientation] = useState(
    ScreenOrientation.Orientation.PORTRAIT_UP,
  );

  const accelerometerData = useAccelerometer();

  const [currentAccelerometerData, setCurrentAccelerometerData] =
    useState(accelerometerData);

  useEffect(() => {
    setCurrentAccelerometerData(accelerometerData);
  }, [accelerometerData]);

  useEffect(() => {
    ScreenOrientation.getOrientationAsync().then(setOrientation);

    const sub = ScreenOrientation.addOrientationChangeListener((event) => {
      setOrientation(event.orientationInfo.orientation);
    });

    return () => ScreenOrientation.removeOrientationChangeListener(sub);
  }, []);

  const screenHeight = Dimensions.get("window").height;

  return (
    <BasicView>
      <View style={styles.textContainer}>
        <ThemedText style={{ textAlign: "center" }}>{text}</ThemedText>
      </View>

      <View style={{ width: "100%", height: screenHeight * 0.6 }}>
        <Camera />
      </View>

      <View style={styles.titleContainer}>
        <NavButton
          onClick={() => onCapture(currentAccelerometerData)}
          text="Capture"
        />
      </View>
    </BasicView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    padding: 10,
  },
});
