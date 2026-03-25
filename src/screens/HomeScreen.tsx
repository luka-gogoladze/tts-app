import React, { useState, useEffect } from "react";
import {
  StatusBar,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { RecordingState, ScreenId } from "../../App";
import { C } from "../constants/Colors";

interface HomeProps {
  inputText: string;
  setText: (t: string) => void;
  setScreen: (s: ScreenId) => void;
  setShowSettings: (v: boolean) => void;
  showPlayer: boolean;
  recordingState: RecordingState;
  transcription: string;
  resetApp: () => void;
}

export const HomeScreen: React.FC<HomeProps> = ({
  inputText,
  setText,
  setShowSettings,
  setScreen,
  transcription,
  recordingState,
  showPlayer,
  resetApp,
}) => {

  const [isAudioFirst, setIsAudioFirst] = useState(true);
  const [displayedTranscription, setDisplayedTranscription] = useState("");

  useEffect(() => {
    if (transcription === "") {
      setDisplayedTranscription("");
      return;
    }

    const words = transcription.trim().split(/\s+/);
    let currentWordIndex = 0;

    setDisplayedTranscription("");

    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        const word = words[currentWordIndex];
        if (word !== undefined) {
          setDisplayedTranscription((prev: string) =>
            prev === "" ? word : prev + " " + word
          );
        }
        currentWordIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [transcription]);
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: C.background }} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, height: 60 }}>
        <TouchableOpacity style={{ flexDirection: "row", gap: 9, alignItems: "center" }} onPress={() => setIsAudioFirst(!isAudioFirst)}>
          <Text variant="titleMedium" style={{ color: C.text }}>{isAudioFirst ? "აუდიო" : "ტექსტი"}</Text>
          <Ionicons name="swap-horizontal" size={18} color={C.text} />
          <Text variant="titleMedium" style={{ color: C.text }}>{isAudioFirst ? "ტექსტი" : "აუდიო"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 4 }}
          onPress={() => setScreen("saved")}
        >
          <Ionicons name="menu" size={26} color={C.text} />
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 10 }}>
        <View style={{ flexDirection: "row", gap: 8, justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={resetApp}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 6,
              paddingHorizontal: 8,
              backgroundColor: C.primary,
              borderRadius: 8,
              gap: 6,
            }}
          >
            <Ionicons name="add" size={14} color={C.surface} />
            <Text style={{ color: C.surface, fontFamily: 'Nino-Bold' }}>
              ახლის გახსნა
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowSettings(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 6,
              paddingHorizontal: 8,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: C.primaryDark,
              gap: 6,

            }}
          >
            <Ionicons name="settings-outline" size={16} color={C.primaryDark} />
            <Text style={{ color: C.primaryDark, fontFamily: 'Nino-Bold' }}>
              პარამეტრები
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {!isAudioFirst && <View style={{ flex: 1, paddingHorizontal: 16, paddingBottom: 20, backgroundColor: C.background }}>
        <TextInput
          multiline
          value={inputText}
          onChangeText={setText}
          placeholder="ჩაწერეთ ან ჩასვით ტექსტი..."
          placeholderTextColor={C.muted}
          mode="flat"
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          style={{
            flex: 1,
            borderRadius: 12,
            backgroundColor: C.surface,
            color: C.text,
            fontSize: 16,
          }}
        />
      </View>}
      {isAudioFirst && (
        <View className="flex-1">
          <View className="flex-1 p-4" style={{ backgroundColor: C.background }}>
            <ScrollView showsVerticalScrollIndicator={true}>
              {displayedTranscription ? (
                <Text variant="bodyLarge" style={{ lineHeight: 24, paddingBottom: 20 }}>
                  {displayedTranscription}
                </Text>
              ) : (
                <View className="flex-row gap-2">
                  <Ionicons name="mic" size={20} color={C.primary} />
                  <Text variant="bodyLarge" className="text-[16px]">
                    დაიწყე ჩაწერა...
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>

          {showPlayer && (
            <View className="p-4" style={{ backgroundColor: C.background }}>
              <View className="flex-row items-center gap-4">
                <TouchableOpacity className="p-3 rounded-full" style={{ backgroundColor: C.primary }}>
                  <Ionicons name="play" size={24} color="white" />
                </TouchableOpacity>
                <View className="flex-1 flex-col gap-2 justify-center">
                  <View className="h-1 bg-gray-200 rounded-full justify-center">
                    <View className="w-0 h-1 bg-[#3B82F6] rounded-full" />
                  </View>
                  <Text className="text-gray-500" style={{ fontFamily: 'Nino-Normal', fontSize: 12 }}>00:00</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};


