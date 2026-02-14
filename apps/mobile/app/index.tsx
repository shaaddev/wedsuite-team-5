import { Text, View } from "react-native";

export default function HomeScreen() {
	return (
		<View className="flex-1 items-center justify-center bg-white dark:bg-black">
			<Text className="font-semibold text-3xl text-black tracking-tight dark:text-white">
				websuite
			</Text>
			<Text className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
				To get started, edit app/index.tsx
			</Text>
		</View>
	);
}
