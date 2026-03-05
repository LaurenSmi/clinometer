import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import DistanceContext from "./distanceContext";
import UnitContext from "./unitContext";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useState } from "react";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const unitState = useState<"m" | "ft">("m");
  const distanceState = useState<number>(0);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <UnitContext.Provider value={unitState}>
        <DistanceContext.Provider value={distanceState}>
          <Stack>
            <Stack.Screen name="index" options={{ title: "" }} />
            <Stack.Screen
              name="base-measurement-screen"
              options={{ title: "Eye-Level Measurement" }}
            />
            <Stack.Screen
              name="modal"
              options={{
                presentation: "modal",
                title: "Modal",
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </DistanceContext.Provider>
      </UnitContext.Provider>
    </ThemeProvider>
  );
}
