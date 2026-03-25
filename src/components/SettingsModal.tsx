import React, { useEffect, useState } from "react";
import { Modal, Pressable, TouchableOpacity, View, ScrollView } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { C } from "../constants/Colors";

interface SettingsProps {
  visible: boolean;
  onClose: () => void;
  lang: string;
  setLang: (v: string) => void;
  source: string;
  setSource: (v: string) => void;
  speakerMode: string;
  setSpeakerMode: (v: string) => void;
  micMode: string;
  setMicMode: (v: string) => void;
  punctuation: boolean;
  setPunctuation: (v: boolean) => void;
  autoCorrect: boolean;
  setAutoCorrect: (v: boolean) => void;
}

const OPTIONS = {
  lang: ["ქართული", "ფრანგული", "იაპონური", "ინგლისური", "არაბული", "ნიდერლანდური", "ბერძნული", "შვედური"],
  source: ["მოსაუბრის გამოყოფა", "მოსაუბრის არ გამოყოფა"],
  speakerMode: ["STT1", "STT2", "STT3"],
  micMode: ["მიკროფონი", "სისტემის ხმა"]
} as const;

type OpenKey = keyof typeof OPTIONS | null;

export const SettingsModal: React.FC<SettingsProps> = ({
  visible,
  onClose,
  lang,
  setLang,
  source,
  setSource,
  speakerMode,
  setSpeakerMode,
  micMode,
  setMicMode,
  punctuation,
  setPunctuation,
  autoCorrect,
  setAutoCorrect,
}) => {
  const [openKey, setOpenKey] = useState<OpenKey>(null);
  const [langQuery, setLangQuery] = useState("");


  useEffect(() => {
    if (!visible) {
      setOpenKey(null);
      setLangQuery("");
    }
  }, [visible]);

  const sections: Array<{
    key: keyof typeof OPTIONS;
    value: string;
    setValue: (value: string) => void;
  }> = [
      { key: "lang", value: lang, setValue: setLang },
      { key: "source", value: source, setValue: setSource },
      {
        key: "speakerMode",
        value: speakerMode,
        setValue: setSpeakerMode,
      },
      {
        key: "micMode",
        value: micMode,
        setValue: setMicMode,
      },
    ];

  const CircleCheckbox = ({ isChecked, onPress }: { isChecked: boolean, onPress: () => void }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: isChecked ? C.primaryDark : C.textSoft,
        backgroundColor: isChecked ? C.primaryDark : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
      }}
    >
      {isChecked && (
        <Ionicons name="checkmark" size={14} color="white" />
      )}
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: C.overlay,
          justifyContent: 'flex-end',
        }}
      >
        <Pressable
          onPress={() => undefined}
          style={{
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            backgroundColor: C.surface,
            overflow: "hidden",
            paddingBottom: 40,
            minHeight: 450,
          }}
        >
          <View style={{ padding: 16, paddingTop: 40 }}>
            {sections.map((section) => {
              const isOpen = openKey === section.key;
              return (
                <View key={section.key} style={{ marginBottom: 12, position: 'relative' }}>
                  <TouchableOpacity
                    onPress={() => setOpenKey(isOpen ? null : section.key)}
                    style={{
                      minHeight: 54,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: isOpen ? C.primary : C.borderStrong,
                      backgroundColor: C.surface,
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text variant="bodyMedium" style={{ color: C.text, fontFamily: 'Nino-Bold' }}>
                        {section.value}
                      </Text>
                    </View>

                    <Ionicons
                      name={isOpen ? "chevron-up" : "chevron-down"}
                      size={16}
                      color={isOpen ? C.primary : C.textSoft}
                    />
                  </TouchableOpacity>

                  {isOpen && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 54,
                        left: 0,
                        right: 0,
                        zIndex: 100,
                        marginTop: 8,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: C.border,
                        backgroundColor: C.surface,
                        overflow: "hidden",
                        maxHeight: 260,
                      }}
                    >
                      {section.key === "lang" && (
                        <View style={{ padding: 8, borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: C.surfaceMuted }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              borderRadius: 12,
                              borderWidth: 1,
                              borderColor: C.borderStrong,
                              backgroundColor: C.surface,
                              paddingHorizontal: 10,
                            }}
                          >
                            <Ionicons name="search" size={18} color={C.muted} />
                            <TextInput
                              value={langQuery}
                              onChangeText={setLangQuery}
                              placeholder="ძიება"
                              placeholderTextColor={C.muted}
                              mode="flat"
                              underlineColor="transparent"
                              activeUnderlineColor="transparent"
                              style={{
                                flex: 1,
                                marginLeft: 8,
                                borderWidth: 0,
                                backgroundColor: C.surface,
                                color: C.text,
                              }}
                            />

                          </View>
                        </View>
                      )}

                      <View style={{ position: 'relative', maxHeight: 200 }}>
                        <ScrollView
                          style={{ maxHeight: 200 }}
                          nestedScrollEnabled
                          keyboardShouldPersistTaps="handled"
                          showsVerticalScrollIndicator={true}
                        >
                          {(section.key === "lang"
                            ? OPTIONS[section.key].filter((option) =>
                              option.toLowerCase().includes(langQuery.toLowerCase())
                            )
                            : OPTIONS[section.key]
                          ).map((option, index) => (
                            <TouchableOpacity
                              key={`${option}-${index}`}
                              onPress={() => {
                                section.setValue(option);
                                setOpenKey(null);
                                if (section.key === "lang") {
                                  setLangQuery("");
                                }
                              }}
                              style={{
                                minHeight: 46,
                                paddingHorizontal: 12,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderBottomWidth:
                                  index ===
                                    (section.key === "lang"
                                      ? OPTIONS[section.key].filter((option) =>
                                        option.toLowerCase().includes(langQuery.toLowerCase())
                                      ).length - 1
                                      : OPTIONS[section.key].length - 1)
                                    ? 0
                                    : 1,
                                borderBottomColor: C.border,
                                backgroundColor: section.value === option ? C.primarySoft : C.surface,
                              }}
                            >
                              <Text variant="bodySmall" style={{ color: section.value === option ? C.primary : C.text }}>
                                {option}
                              </Text>
                              {section.value === option && (
                                <Ionicons name="checkmark" size={16} color={C.primary} />
                              )}
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    </View>
                  )}
                </View>
              );
            })}

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  setPunctuation(true);
                  setAutoCorrect(false);
                }}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <CircleCheckbox
                  isChecked={punctuation}
                  onPress={() => {
                    setPunctuation(true);
                    setAutoCorrect(false);
                  }}
                />
                <Text style={{ color: C.text, fontFamily: 'Nino-Bold' }}>პუნქტუაცია</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setAutoCorrect(true);
                  setPunctuation(false);
                }}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <CircleCheckbox
                  isChecked={autoCorrect}
                  onPress={() => {
                    setAutoCorrect(true);
                    setPunctuation(false);
                  }}
                />
                <Text style={{ color: C.text, fontFamily: 'Nino-Bold' }}>ავტოკორექტი</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 32, gap: 12 }}>

              <TouchableOpacity
                onPress={onClose}
                style={{
                  flex: 1,
                  height: 55,
                  backgroundColor: '#E0F1FF',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: C.primaryDark, fontFamily: 'Nino-Bold', fontSize: 18 }}>
                  გაუქმება
                </Text>
              </TouchableOpacity>


              <TouchableOpacity
                onPress={onClose}
                style={{
                  flex: 1,
                  height: 55,
                  backgroundColor: C.primary,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: C.background, fontFamily: 'Nino-Bold', fontSize: 18 }}>
                  დამახსოვრება
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};