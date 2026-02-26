import { Tabs } from "expo-router";

export default function TabsLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="vendors"
				options={{
					title: "Vendors",
					tabBarLabel: "Vendors",
				}}
			/>
			<Tabs.Screen
				name="planning"
				options={{
					title: "Planning",
					tabBarLabel: "Planning",
				}}
			/>
			<Tabs.Screen
				name="user"
				options={{
					title: "User",
					tabBarLabel: "User",
				}}
			/>
		</Tabs>
	);
}
