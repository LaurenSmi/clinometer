import { Accelerometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export function AccelerometerComponent() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    if (!Accelerometer.isAvailableAsync()) {
      console.warn("Accelerometer is not available on this device");
      return;
    }
    // Subscribe to accelerometer updates
    const subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
    });

    // Set update interval (optional, default is 100ms)
    Accelerometer.setUpdateInterval(100);

    // Cleanup subscription on unmount
    return () => subscription && subscription.remove();
  }, []);

  return (
    <View>
      <Text style={styles.text}>Accelerometer Data:</Text>
      <Text style={styles.text}>X: {data.x.toFixed(2)}</Text>
      <Text style={styles.text}>Y: {data.y.toFixed(2)}</Text>
      <Text style={styles.text}>Z: {data.z.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginVertical: 8,
    fontWeight: "bold",
    color: "white",
  },
});
