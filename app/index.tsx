import Icon from "@expo/vector-icons/FontAwesome";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";

import BasicView from "@/components/basic-view";
import { NavButton } from "@/components/nav-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { units } from "@/constants/consts";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import StepContext from "./contexts/stepContext";
import UnitContext from "./contexts/unitContext";
import DistanceContext from "./distanceContext";

const inputBackgroundColor = "#FFFFFF";
const inputTextColor = "#54753F";
const borderColor = "#FFFFFF";

export default function HomeScreen() {
  const [unit, setUnit] = useContext(UnitContext)!;
  const [, setDistance] = useContext(DistanceContext)!;
  const [, setStep] = useContext(StepContext)!;

  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    setStep(1);
  }, []);

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
      router.push("/top-measurement-screen");
    }
  };

  return (
    <BasicView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">The #1 Clinometer</ThemedText>
      </ThemedView>
      <ThemedText type="defaultSemiBold">Let's get measuring!</ThemedText>

      <ThemedText>Enter your distance from the base of the tree</ThemedText>

      <ThemedView style={styles.titleContainer}>
        <TextInput
          keyboardType="numeric"
          placeholder=""
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
        text="Start"
      />
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
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    width: 150,
  },
  dropdownButtonStyle: {
    width: 100,
    height: 50,
    backgroundColor: inputBackgroundColor,
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
    color: inputTextColor,
  },
  dropdownButtonArrowStyle: {
    fontSize: 20,
  },
  dropdownButtonIconStyle: {
    fontSize: 20,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: inputBackgroundColor,
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
