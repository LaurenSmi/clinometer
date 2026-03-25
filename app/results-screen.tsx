import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

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
      <View style={{ gap: 12 }} />
      <ThemedText style={{ textAlign: "center" }}>
        Angle to the top of tree: {angleToTop.toFixed(2)}°
      </ThemedText>
      <ThemedText style={{ textAlign: "center" }}>
        Angle to the bottom of tree: {angleToBottom.toFixed(2)}°
      </ThemedText>
      <ThemedText style={{ textAlign: "center" }}>
        Distance to tree: {distance.toFixed(2)} {units}
      </ThemedText>

      <Image
        source={require("@/assets/images/results.png")}
        style={styles.headerImage}
        contentFit="contain"
      />

      <ThemedText style={{ textAlign: "center" }}>
        Height = {distance.toFixed(2)} × (tan({angleToTop.toFixed(2)}) − tan(
        {angleToBottom.toFixed(2)})) {units}
      </ThemedText>
      <View style={{ gap: 12 }} />

      <View style={styles.resultsContainer}>
        <ThemedText type="subtitle">Height of the tree:</ThemedText>
        <ThemedText type="subtitleBold">
          {height.toFixed(2)} {units}
        </ThemedText>
      </View>

      <View style={styles.titleContainer}>
        <NavButton onClick={handleDone} text="Done" />
      </View>
    </BasicView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    marginTop: 16,
  },
  resultsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7FBEE",
    borderRadius: 19,
    padding: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  headerImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
  },
});
