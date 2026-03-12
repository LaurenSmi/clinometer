import MeasurementScreen from "@/components/measurement-screen";

import { accelerometerToAngle } from "@/hooks/calc-height";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import AngleContext from "./contexts/angleContext";
import StepContext from "./contexts/stepContext";

export default function TopMeasurementScreen() {
  const [, setAngles] = useContext(AngleContext)!;
  const [, setStep] = useContext(StepContext)!;
  const router = useRouter();

  useEffect(() => {
    setStep(2);
  }, []);

  const handleCapture = (accelerometerData: {
    x: number;
    y: number;
    z: number;
  }) => {
    const angle = accelerometerToAngle(accelerometerData);
    setAngles((prev) => ({ ...prev, angleToTop: angle }));
    router.push("/bottom-measurement-screen");
  };

  return (
    <>
      <MeasurementScreen
        text="Tilt your phone to point the cross hair to the top of the tree and press Capture."
        onCapture={handleCapture}
      />
    </>
  );
}
