import MeasurementScreen from "@/components/measurement-screen";
import { Fonts } from "@/constants/theme";
import { accelerometerToAngle } from "@/hooks/calc-height";
import { useRouter } from "expo-router";
import type { Orientation } from "expo-screen-orientation";
import { useContext, useEffect } from "react";
import { Text as RText } from "react-native";
import AngleContext from "./contexts/angleContext";
import StepContext from "./contexts/stepContext";

export default function TopMeasurementScreen(orientation: Orientation) {
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
    const angle = accelerometerToAngle(accelerometerData, orientation);
    setAngles((prev) => ({ ...prev, angleToTop: angle }));
    router.push("/bottom-measurement-screen");
  };

  return (
    <>
      <MeasurementScreen
        text={
          <>
            Tilt your phone to point the crosshair at the{" "}
            <RText style={{ fontFamily: Fonts.bold }}>top</RText> of the tree
            and press Capture.
          </>
        }
        onCapture={handleCapture}
      />
    </>
  );
}
