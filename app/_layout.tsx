import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import DistanceContext from "./distanceContext";
import StepContext from "./stepContext";
import UnitContext from "./unitContext";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useState } from "react";
import AngleContext from "./angleContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const unitState = useState<"m" | "ft">("m");
  const distanceState = useState<number>(0);
  const stepState = useState<number>(1);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StepContext.Provider value={stepState}>
        <UnitContext.Provider value={unitState}>
          <DistanceContext.Provider value={distanceState}>
            <AngleContext.Provider
              value={useState({ angleToBottom: 0, angleToTop: 0 })}
            >
              <Stack>
                <Stack.Screen name="index" options={{ title: "" }} />
                <Stack.Screen
                  name="top-measurement-screen"
                  options={{ title: "Top Measurement" }}
                />
                <Stack.Screen
                  name="bottom-measurement-screen"
                  options={{ title: "Bottom Measurement" }}
                />
                <Stack.Screen
                  name="results-screen"
                  options={{ title: "Results" }}
                />
              </Stack>
              <StatusBar style="auto" />
            </AngleContext.Provider>
          </DistanceContext.Provider>
        </UnitContext.Provider>
      </StepContext.Provider>
    </ThemeProvider>
  );
}
