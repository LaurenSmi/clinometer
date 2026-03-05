import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { NavButton } from "@/components/nav-button";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { calcHeight } from "@/hooks/calc-height";
import { useRouter } from "expo-router";
import { useContext } from "react";
import AngleContext from "./angleContext";
import DistanceContext from "./distanceContext";
import UnitContext from "./unitContext";

export default function HomeScreen() {
  const [distance] = useContext(DistanceContext)!;
  const [units] = useContext(UnitContext)!;
  const [{ angleToTop, angleToBottom }] = useContext(AngleContext)!;

  const height = calcHeight(angleToTop, angleToBottom, distance);

  const router = useRouter();

  const handleDone = () => {
    router.push("/");
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
      <ThemedText>Angle to the top of tree: </ThemedText>
      <ThemedText>Angle to the bottom of tree: </ThemedText>
      <ThemedText>
        Distance to tree: {distance.toFixed(2)} {units}
      </ThemedText>

      <ThemedText>
        Height = {distance} * (tan({angleToTop} + tan({angleToBottom * -1}))){" "}
        {units}{" "}
      </ThemedText>

      <ThemedText type="title">Calculated Height: </ThemedText>
      <ThemedText type="title">
        {height.toFixed(2)} {units}
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
