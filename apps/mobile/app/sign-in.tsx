import { useAuth, useSignIn, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { AuthForm } from "@/components/auth-forms";
import { getOnboardingState } from "@/lib/onboarding";

export default function SignInScreen() {
	const router = useRouter();
	const { isSignedIn } = useAuth();
	const { user } = useUser();
	const { isLoaded, signIn, setActive } = useSignIn();
	const [isPending, setIsPending] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (!isSignedIn) {
			return;
		}

		const { onboardingComplete } = getOnboardingState(user);
		router.replace(onboardingComplete ? "/dashboard" : "/onboarding");
	}, [isSignedIn, router, user]);

	const onSubmit = async (email: string, password: string) => {
		if (!isLoaded) {
			return;
		}

		setErrorMessage("");
		setIsPending(true);

		try {
			const result = await signIn.create({ identifier: email, password });
			if (result.status === "complete" && result.createdSessionId) {
				await setActive({ session: result.createdSessionId });
				router.replace("/onboarding");
				return;
			}
			setErrorMessage("Sign in needs an additional step. Please try again.");
		} catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : "Unable to sign in.",
			);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<AuthForm
			title="Sign In"
			subtitle="Access your WedSuite account."
			submitLabel="Continue"
			secondaryHref="/sign-up"
			secondaryLabel="Need an account? Sign up"
			isPending={isPending}
			errorMessage={errorMessage}
			onSubmit={onSubmit}
		/>
	);
}
