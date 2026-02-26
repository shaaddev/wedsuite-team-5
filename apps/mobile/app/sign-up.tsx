import { useAuth, useSignUp, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { AuthForm } from "@/components/auth-forms";
import { getOnboardingState } from "@/lib/onboarding";

export default function SignUpScreen() {
	const router = useRouter();
	const { isSignedIn } = useAuth();
	const { user } = useUser();
	const { isLoaded, signUp, setActive } = useSignUp();
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
			const result = await signUp.create({
				emailAddress: email,
				password,
			});

			if (result.status === "complete" && result.createdSessionId) {
				await setActive({ session: result.createdSessionId });
				router.replace("/onboarding");
				return;
			}

			setErrorMessage(
				"Sign up created, but additional verification may be required in Clerk.",
			);
		} catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : "Unable to sign up.",
			);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<AuthForm
			title="Sign Up"
			subtitle="Create your WedSuite account."
			submitLabel="Create Account"
			secondaryHref="/sign-in"
			secondaryLabel="Already have an account? Sign in"
			isPending={isPending}
			errorMessage={errorMessage}
			onSubmit={onSubmit}
		/>
	);
}
