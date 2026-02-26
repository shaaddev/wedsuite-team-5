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
	const [isCodeStep, setIsCodeStep] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (!isSignedIn) {
			return;
		}

		const { onboardingComplete } = getOnboardingState(user);
		router.replace(onboardingComplete ? "/(tabs)/planning" : "/onboarding");
	}, [isSignedIn, router, user]);

	const onRequestCode = async (email: string) => {
		if (!isLoaded) {
			return;
		}
		if (!email) {
			setErrorMessage("Please enter your email.");
			return;
		}

		setErrorMessage("");
		setIsPending(true);

		try {
			const result = await signUp.create({
				emailAddress: email,
			});
			if (result.unverifiedFields.includes("email_address")) {
				await signUp.prepareEmailAddressVerification({
					strategy: "email_code",
				});
				setIsCodeStep(true);
				return;
			}
			setErrorMessage("Unable to start email verification.");
		} catch (error) {
			setErrorMessage(
				error instanceof Error
					? error.message
					: "Unable to send verification code.",
			);
		} finally {
			setIsPending(false);
		}
	};

	const onVerifyCode = async (code: string) => {
		if (!isLoaded) {
			return;
		}
		if (!code) {
			setErrorMessage("Please enter the verification code.");
			return;
		}

		setErrorMessage("");
		setIsPending(true);

		try {
			const result = await signUp.attemptEmailAddressVerification({
				code,
			});
			if (result.status === "complete" && result.createdSessionId) {
				await setActive({ session: result.createdSessionId });
				router.replace("/onboarding");
				return;
			}
			setErrorMessage("Verification is incomplete. Try again.");
		} catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : "Unable to verify code.",
			);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<AuthForm
			title="Sign Up"
			subtitle={
				isCodeStep
					? "Enter the verification code sent to your email."
					: "Enter your email to create an account."
			}
			requestCodeLabel="Send Verification Code"
			verifyCodeLabel="Verify & Create Account"
			secondaryHref="/sign-in"
			secondaryLabel="Already have an account? Sign in"
			isPending={isPending}
			errorMessage={errorMessage}
			isCodeStep={isCodeStep}
			onRequestCode={onRequestCode}
			onVerifyCode={onVerifyCode}
			onUseDifferentEmail={() => {
				setIsCodeStep(false);
				setErrorMessage("");
			}}
		/>
	);
}
