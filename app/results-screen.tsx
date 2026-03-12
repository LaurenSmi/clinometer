import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import BasicView from "@/components/basic-view";
import { NavButton } from "@/components/nav-button";
import { ThemedText } from "@/components/themed-text";
import { calcHeight } from "@/hooks/calc-height";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import AngleContext from "./contexts/angleContext";
import StepContext from "./contexts/stepContext";
import UnitContext from "./contexts/unitContext";
import DistanceContext from "./distanceContext";

export default function HomeScreen() {
  const [distance] = useContext(DistanceContext)!;
  const [units] = useContext(UnitContext)!;
  const [{ angleToTop, angleToBottom }] = useContext(AngleContext)!;
  const [, setStep] = useContext(StepContext)!;

  const height = calcHeight(angleToTop, angleToBottom, distance);

  const router = useRouter();

  useEffect(() => {
    setStep(4);
  }, []);

  const handleDone = () => {
    router.replace("/");
  };

  return (
    <BasicView>
      <ThemedText>
        Angle to the top of tree: {angleToTop.toFixed(2)}°
      </ThemedText>
      <ThemedText>
        Angle to the bottom of tree: {angleToBottom.toFixed(2)}°
      </ThemedText>
      <ThemedText>
        Distance to tree: {distance.toFixed(2)} {units}
      </ThemedText>

      <ThemedText>
        Height = {distance.toFixed(2)} * (tan({angleToTop.toFixed(2)}) + tan(
        {(angleToBottom * -1).toFixed(2)})) {units}
      </ThemedText>

      <Image
        source={require("@/assets/images/final-angle-image.png")}
        style={styles.headerImage}
      />

      <ThemedText type="title">
        Calculated Height: {height.toFixed(2)} {units}{" "}
      </ThemedText>

      <NavButton onClick={handleDone} text="Done" />
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
  headerImage: {
    width: "100%",
    height: 300,
  },
});
