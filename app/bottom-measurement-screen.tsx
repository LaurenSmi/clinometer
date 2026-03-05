import MeasurementScreen from "@/components/measurement-screen";
import { accelerometerToAngle } from "@/hooks/calc-height";
import { useRouter } from "expo-router";
import { useContext } from "react";
import AngleContext from "./angleContext";

export default function BottomMeasurementScreen() {
  const [, setAngles] = useContext(AngleContext)!;
  const router = useRouter();

  const handleCapture = (accelerometerData: {
    x: number;
    y: number;
    z: number;
  }) => {
    const angle = accelerometerToAngle(accelerometerData);
    setAngles((prev) => ({ ...prev, angleToBottom: angle }));
    router.push("/results-screen");
  };

  return (
    <MeasurementScreen
      text="Tilt your phone to point the cross hair to the base of the tree and press Capture."
      onCapture={handleCapture}
    />
  );
}
