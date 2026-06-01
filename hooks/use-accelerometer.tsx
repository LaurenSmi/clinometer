import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";

export function useAccelerometer(
  onDataChange?: (data: { x: number; y: number; z: number }) => void,
) {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    let subscription: any;

    const subscribe = async () => {
      const available = await Accelerometer.isAvailableAsync();
      if (!available) {
        console.warn("Accelerometer is not available on this device");
        return;
      }

      subscription = Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
        onDataChange?.(accelerometerData);
      });

      Accelerometer.setUpdateInterval(100); // ms
    };

    subscribe();

    return () => subscription && subscription.remove();
  }, [onDataChange]);

  return data;
}
