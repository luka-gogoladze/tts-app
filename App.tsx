import "./global.css";
import React, { useState, useEffect } from "react";
import { TXT } from "./src/constants/Texts";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { MD3LightTheme, PaperProvider, configureFonts } from "react-native-paper";
import { HomeScreen } from "./src/screens/HomeScreen";
import { SavedScreen } from "./src/screens/SavedScreen";
import { SettingsModal } from "./src/components/SettingsModal";
import { BottomNav } from "./src/components/BottomNav";

SplashScreen.preventAutoHideAsync();

export type ScreenId = "home" | "saved";
export type RecordingState = "idle" | "recording" | "stopped";

const fontConfig = {
  fontFamily: "Nino-Normal",
};

const theme = {
  ...MD3LightTheme,
  fonts: configureFonts({
    config: {
      displayLarge: { fontFamily: "Nino-Normal" },
      displayMedium: { fontFamily: "Nino-Normal" },
      displaySmall: { fontFamily: "Nino-Normal" },
      headlineLarge: { fontFamily: "Nino-Normal" },
      headlineMedium: { fontFamily: "Nino-Normal" },
      headlineSmall: { fontFamily: "Nino-Normal" },
      titleLarge: { fontFamily: "Nino-Bold" },
      titleMedium: { fontFamily: "Nino-Bold" },
      titleSmall: { fontFamily: "Nino-Bold" },
      labelLarge: { fontFamily: "Nino-Normal" },
      labelMedium: { fontFamily: "Nino-Normal" },
      labelSmall: { fontFamily: "Nino-Normal" },
      bodyLarge: { fontFamily: "Nino-Normal" },
      bodyMedium: { fontFamily: "Nino-Normal" },
      bodySmall: { fontFamily: "Nino-Normal" },
    },
  }),
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Nino-Normal": require("./assets/fonts/bpg_nino_mtavruli_normal.ttf"),
    "Nino-Bold": require("./assets/fonts/bpg_nino_mtavruli_bold.ttf"),
  });

  const [screen, setScreen] = useState<ScreenId>("home");
  const [inputText, setText] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [transcription, setTranscription] = useState("");


  const handleRecordPress = () => {
    if (recordingState === "idle") {
      setRecordingState("recording");
      setTranscription(TXT.GEORGIAN_SAMPLE);
      setShowPlayer(false);
    } else {
      setRecordingState("stopped");
      setShowPlayer(true);
    }
  };


  const resetApp = () => {
    setTranscription("");
    setRecordingState("idle");
    setShowPlayer(false);
    setText("");
  };

  const [lang, setLang] = useState("ქართული");
  const [source, setSource] = useState("მოსაუბრის გამოყოფა");
  const [speakerMode, setSpeakerMode] = useState("STT1");
  const [micMode, setMicMode] = useState("მიკროფონი");
  const [punctuation, setPunctuation] = useState(true);
  const [autoCorrect, setAutoCorrect] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      console.log("Fonts loaded:", fontsLoaded);
      if (fontError) console.error("Font error:", fontError);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="dark-content" />

      {screen === "home" ? (
        <HomeScreen
          inputText={inputText}
          setText={setText}
          setScreen={setScreen}
          setShowSettings={setShowSettings}
          showPlayer={showPlayer}
          recordingState={recordingState}
          transcription={transcription}
          resetApp={resetApp}
        />
      ) : (
        <SavedScreen setScreen={setScreen} />
      )}
      <BottomNav
        currentScreen={screen}
        setScreen={setScreen}
        recordingState={recordingState}
        handleRecordPress={handleRecordPress}
      />
      <SettingsModal
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        lang={lang}
        setLang={setLang}
        source={source}
        setSource={setSource}
        speakerMode={speakerMode}
        setSpeakerMode={setSpeakerMode}
        micMode={micMode}
        setMicMode={setMicMode}
        punctuation={punctuation}
        setPunctuation={setPunctuation}
        autoCorrect={autoCorrect}
        setAutoCorrect={setAutoCorrect}
      />
    </PaperProvider>
  );
}
