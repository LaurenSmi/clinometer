import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";

export function AccelerometerComponent({
  onDataChange,
}: {
  onDataChange?: (data: { x: number; y: number; z: number }) => void;
}) {
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
      onDataChange?.(accelerometerData);
    });

    // Set update interval (optional, default is 100ms)
    Accelerometer.setUpdateInterval(100);

    // Cleanup subscription on unmount
    return () => subscription && subscription.remove();
  }, []);

  // return (
  //   <View>
  //     <Text style={styles.text}>Accelerometer Data:</Text>
  //     <Text style={styles.text}>X: {data.x.toFixed(2)}</Text>
  //     <Text style={styles.text}>Y: {data.y.toFixed(2)}</Text>
  //     <Text style={styles.text}>Z: {data.z.toFixed(2)}</Text>
  //   </View>
  // );
}
