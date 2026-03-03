import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { AppButton, Screen, uiStyles } from "@/components/ui";
import { authClient } from "@/lib/auth-client";
import { useMobileSession } from "@/lib/session-context";

export default function UserTab() {
  const router = useRouter();
  const { isLoading, setUser, user } = useMobileSession();
  const isSignedIn = Boolean(user);

  if (isLoading) {
    return (
      <Screen>
        <Text style={uiStyles.subheading}>Loading user...</Text>
      </Screen>
    );
  }

  if (!isSignedIn) {
    return (
      <Screen>
        <Text style={uiStyles.heading}>Welcome</Text>
        <Text style={[uiStyles.subheading, styles.copy]}>
          Sign in or register to access vendors and planning.
        </Text>
        <View style={styles.actions}>
          <AppButton label="Sign In" onPress={() => router.push("/sign-in")} />
          <AppButton
            label="Register"
            onPress={() => router.push("/sign-up")}
            variant="outline"
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={uiStyles.heading}>Your Account</Text>
      <Text style={[uiStyles.subheading, styles.copy]}>
        {user?.email ?? "Signed in"}
      </Text>
      <View style={styles.actions}>
        <AppButton
          label="Edit Onboarding"
          onPress={() => router.push("/onboarding")}
          variant="outline"
        />
        <AppButton
          label="Sign Out"
          onPress={async () => {
            await authClient.signOut();
            setUser(null);
            router.replace("/sign-in");
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  copy: {
    marginTop: 6,
  },
  actions: {
    marginTop: 16,
    gap: 10,
  },
});
