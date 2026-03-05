import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { NavButton } from "@/components/nav-button";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { calcHeight } from "@/hooks/calc-height";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import AngleContext from "./angleContext";
import DistanceContext from "./distanceContext";
import StepContext from "./stepContext";
import UnitContext from "./unitContext";

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
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/tree.jpg")}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Results</ThemedText>
      </ThemedView>
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

      <ThemedText type="title">
        Calculated Height: {height.toFixed(2)} {units}{" "}
      </ThemedText>

      <NavButton onClick={handleDone} text="Done" />
    </ParallaxScrollView>
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
