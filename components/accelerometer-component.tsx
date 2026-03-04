import { Accelerometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export function AccelerometerComponent() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    // Subscribe to accelerometer updates
    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });

    // Set update interval (optional, default is 100ms)
    Accelerometer.setUpdateInterval(100);

    // Cleanup subscription on unmount
    return () => subscription && subscription.remove();
  }, []);

  return (
    <View>
      <Text>Accelerometer Data:</Text>
      <Text>X: {data.x.toFixed(2)}</Text>
      <Text>Y: {data.y.toFixed(2)}</Text>
      <Text>Z: {data.z.toFixed(2)}</Text>
    </View>
  );
}