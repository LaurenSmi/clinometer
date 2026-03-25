import Icon from "@expo/vector-icons/FontAwesome";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";

import BasicView from "@/components/basic-view";
import { NavButton } from "@/components/nav-button";
import { ThemedText } from "@/components/themed-text";
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
const screenHeight = Dimensions.get("window").height;

export default function HomeScreen() {
  const [unit, setUnit] = useContext(UnitContext)!;
  const [, setDistance] = useContext(DistanceContext)!;
  const [, setStep] = useContext(StepContext)!;

  const router = useRouter();

  useEffect(() => {
    setStep(1);
  }, []);

  const [isValidDistance, setIsValidDistance] = useState(false);
  const [distanceInput, setDistanceInput] = useState("");

  const handleDistanceChange = (text: string) => {
    setDistanceInput(text);
    if (isNaN(Number(text)) || Number(text) <= 0 || text === "") {
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
      <View style={styles.container}>
        <View style={{ height: screenHeight * 0.15 }} />

        <View style={{ gap: 12 }}>
          <ThemedText style={{ textAlign: "center" }} type="title">
            The #1
          </ThemedText>
        </View>

        <ThemedText style={{ textAlign: "center" }} type="title">
          Clinometer
        </ThemedText>

        {/* Medium gap between title and subtitle */}
        <View style={{ height: 40 }} />

        <ThemedText style={{ textAlign: "center" }} type="defaultSemiBold">
          Let's get measuring!
        </ThemedText>

        <ThemedText style={{ textAlign: "center" }}>
          Enter the distance to the base of the tree:
        </ThemedText>

        <View style={styles.rowContainer}>
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
            onSelect={(selectedItem) => setUnit(selectedItem.title)}
            dropdownOverlayColor="transparent"
            renderButton={(selectedItem, isOpened) => (
              <View
                style={[
                  styles.dropdownButtonStyle,
                  { backgroundColor: inputBackgroundColor },
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
            )}
            renderItem={(item, index, isSelected) => (
              <View
                style={[
                  styles.dropdownItemStyle,
                  isSelected && styles.dropdownItemSelectedStyle,
                ]}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </View>
        <View style={{ height: 40 }} />

        <View style={{ alignItems: "center", width: "100%" }}>
          <NavButton
            onClick={handleStartMeasuring}
            isDisabled={!isValidDistance}
            text="Start"
          />
        </View>
      </View>
    </BasicView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  centerContainer: {
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
  },
  input: {
    padding: 12,
    paddingBottom: 8,

    borderRadius: 9,
    width: 150,
    fontSize: 18,
    height: 40,
  },
  dropdownButtonStyle: {
    width: 100,
    height: 40,
    borderRadius: 9,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 20,
    color: inputTextColor,
  },
  dropdownButtonArrowStyle: {
    fontSize: 12,
  },
  dropdownMenuStyle: {
    backgroundColor: inputBackgroundColor,
    borderRadius: 9,
    marginTop: -30,
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
  },
  dropdownItemSelectedStyle: {
    backgroundColor: "#D6D9CE",
  },
});
