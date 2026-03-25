import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../constants/Colors";
import { ScreenId, RecordingState } from "../../App";
import { SafeAreaView } from "react-native-safe-area-context";

interface BottomNavProps {
  currentScreen: ScreenId;
  setScreen: (id: ScreenId) => void;
  recordingState: RecordingState;
  handleRecordPress: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  currentScreen, 
  setScreen, 
  recordingState, 
  handleRecordPress 
}) => {
  return (
    <SafeAreaView className="flex flex-row items-center justify-around py-2" edges={['bottom']} style={{
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: C.background,
      borderTopWidth: 0,

    }}>

      <TouchableOpacity style={styles.item}
        onPress={() => undefined}
      >
        <Ionicons
          name="document-text-outline"
          size={40}
          color={currentScreen === "saved" ? C.primary : C.textSoft}
        />
        <Text variant="labelMedium" style={{ fontFamily: "Nino-Normal" }}>
          აუდიო ფაილი
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={handleRecordPress}
      >
        {recordingState !== "recording" ? <View className="rounded-[10] items-center justify-center" style={{ backgroundColor: C.primary, paddingHorizontal: 11, paddingVertical: 11 }}>
          <Ionicons
            name="mic"
            size={30}
            color={C.surface}
          />
        </View> : <View className="rounded-[10] items-center justify-center" style={{ backgroundColor: C.danger, paddingHorizontal: 11, paddingVertical: 11 }}>
          <View className="rounded-[5] items-center justify-center" style={{ backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 15 }}></View>
        </View>}

        <Text variant="labelMedium" style={{ fontFamily: "Nino-Normal" }}>
          ჩაწერა
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={() => undefined}
      >
        <Ionicons name="logo-youtube" size={40} color="#FF0000" />
        <Text variant="labelMedium" style={{ fontFamily: "Nino-Normal" }}>
          Youtube Link
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    gap: 8
  }
})