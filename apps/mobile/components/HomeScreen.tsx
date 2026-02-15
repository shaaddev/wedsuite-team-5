import { Text, View } from "react-native";

export function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="font-semibold text-3xl text-black tracking-tight dark:text-white">
        WebSuite Mobile
      </Text>
      <Text className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
        To get started, edit components/HomeScreen.tsx
      </Text>
    </View>
  );
}
