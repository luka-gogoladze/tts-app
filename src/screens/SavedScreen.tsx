import React from "react";
import { ScrollView, TouchableOpacity, View, Image } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import type { ScreenId } from "../../App";
import { C } from "../constants/Colors";

interface SavedProps {
  setScreen: (v: ScreenId) => void;
}

const GROUPS = [
  {
    title: "დღეს",
    items: [
      { id: "1", text: "ტრანსკრიპციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ..." },
      { id: "2", text: "ტრანსკრიპციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ..." },
    ],
  },
  {
    title: "გუშინ",
    items: [
      { id: "3", text: "ტრანსკრიპციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ..." },
      { id: "4", text: "ტრანსკრიპციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ..." },
    ],
  },
  {
    title: "11 მარტი",
    items: [
      { id: "5", text: "ტრანსკრიპციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ..." },
      { id: "6", text: "ტრანსკრიპციის სერვისი ხმას ტექსტად გარდაქმნის სწრაფად და მარტივად. მომხმარებელს შეუძ..." },
    ],
  },
];

export const SavedScreen: React.FC<SavedProps> = ({ setScreen }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.surfaceMuted }}>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: C.surface
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity onPress={() => setScreen("home")}>
            <MaterialIcons name="keyboard-arrow-left" size={28} color={C.text} />
          </TouchableOpacity>

          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#E6E96E', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555' }}>A</Text>
          </View>

          <View>
            <Text style={{ fontSize: 13, color: C.textSoft, fontFamily: 'Nino-Bold' }}>achi.teruashvili777@gmail.com</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#3AD2A7', paddingHorizontal: 6, paddingVertical: 1, borderRadius: 10, alignSelf: 'flex-start', marginTop: 2 }}>
              <Text style={{ fontSize: 12, color: C.surface, fontFamily: 'Nino-Normal', }}>პრემიუმი</Text>
              <Ionicons name="star" size={12} color={'#FED533'} style={{ position: 'absolute', right: -5, top: -3 }} />
            </View>
          </View>
        </View>

        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            overflow: 'hidden',
            borderWidth: 1.5,
            borderColor: C.borderStrong,
            backgroundColor: '#FFF',
          }}>
            <Image
              source={{ uri: 'https://flagcdn.com/w80/ge.png' }}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
            />
          </View>
          <Ionicons name="chevron-down" size={16} color={C.textSoft} style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {GROUPS.map((group) => (
          <View key={group.title} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 14, color: C.muted, marginBottom: 12, textTransform: 'lowercase', fontFamily: 'Nino-Normal' }}>{group.title}</Text>

            {group.items.map((item) => (
              <View
                key={item.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: C.surface,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: C.primary,
                  padding: 12,
                  marginBottom: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 4,
                  elevation: 2
                }}
              >
                <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="pencil-outline" size={24} color={C.primary} />
                </View>

                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <Text numberOfLines={2} style={{ fontSize: 13, color: C.text, lineHeight: 18, fontFamily: 'Nino-Bold' }}>
                    {item.text}
                  </Text>
                </View>

                <TouchableOpacity style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="trash-outline" size={22} color={C.muted} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
