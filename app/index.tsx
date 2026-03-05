import Icon from "@expo/vector-icons/FontAwesome";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";

import { NavButton } from "@/components/nav-button";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { units } from "@/constants/consts";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import DistanceContext from "./distanceContext";
import UnitContext from "./unitContext";

export default function HomeScreen() {
  const [unit, setUnit] = useContext(UnitContext)!;
  const [, setDistance] = useContext(DistanceContext)!;

  const colorScheme = useColorScheme();
  const router = useRouter();

  const inputBackgroundColor = colorScheme === "dark" ? "#133b28" : "#E9ECEF";
  const inputTextColor = colorScheme === "dark" ? "#E9ECEF" : "#151E26";
  const borderColor = colorScheme === "dark" ? "#133b28" : "#ccc";
  const [isValidDistance, setIsValidDistance] = useState(false);
  const [distanceInput, setDistanceInput] = useState("");

  const handleDistanceChange = (text: string) => {
    setDistanceInput(text);
    if (isNaN(Number(text)) || Number(text) <= 0 || text === "") {
      console.warn("Please enter a valid number for distance.");
      setIsValidDistance(false);
      return;
    }
    setIsValidDistance(true);
  };

  const handleStartMeasuring = () => {
    if (isValidDistance) {
      setDistance(Number(distanceInput));
      router.push("/base-measurement-screen");
    }
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
        <ThemedText type="title">Let's get measuring!</ThemedText>
      </ThemedView>
      <ThemedText>Enter your distance from the base of the tree</ThemedText>

      <ThemedView style={styles.titleContainer}>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter distance"
          placeholderTextColor={colorScheme === "dark" ? "#7D8D97" : "#999"}
          style={[
            styles.input,
            {
              backgroundColor: inputBackgroundColor,
              color: inputTextColor,
              borderColor: borderColor,
            },
          ]}
          value={distanceInput ? distanceInput.toString() : ""}
          onChange={(e) => handleDistanceChange(e.nativeEvent.text)}
        />
        <SelectDropdown
          data={units}
          onSelect={(selectedItem) => {
            setUnit(selectedItem.title);
          }}
          dropdownOverlayColor="transparent"
          renderButton={(selectedItem, isOpened) => {
            return (
              <View
                style={[
                  styles.dropdownButtonStyle,
                  {
                    backgroundColor: inputBackgroundColor,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dropdownButtonTxtStyle,
                    { color: inputTextColor },
                  ]}
                >
                  {(selectedItem && selectedItem.unit) || unit}
                </Text>
                <Icon
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={[
                    styles.dropdownButtonArrowStyle,
                    { color: inputTextColor },
                  ]}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={[
                  styles.dropdownItemStyle,
                  isSelected && styles.dropdownItemSelectedStyle,
                ]}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </ThemedView>
      <NavButton
        onClick={handleStartMeasuring}
        isDisabled={!isValidDistance}
        text="Start Measuring"
      />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    width: 150,
  },
  dropdownButtonStyle: {
    width: 100,
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 20,
  },
  dropdownButtonIconStyle: {
    fontSize: 20,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownItemSelectedStyle: {
    backgroundColor: "#bcbfc2",
  },
});
