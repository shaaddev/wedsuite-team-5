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
			await signIn.create({ identifier: email });
			const supportedFirstFactors = signIn.supportedFirstFactors ?? [];
			const emailFactor = supportedFirstFactors.find(
				(factor) =>
					factor.strategy === "email_code" && "emailAddressId" in factor,
			);

			if (!emailFactor || !("emailAddressId" in emailFactor)) {
				setErrorMessage("Email verification is not enabled for this account.");
				return;
			}

			await signIn.prepareFirstFactor({
				strategy: "email_code",
				emailAddressId: emailFactor.emailAddressId,
			});
			setIsCodeStep(true);
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
			const result = await signIn.attemptFirstFactor({
				strategy: "email_code",
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
			title="Sign In"
			subtitle={
				isCodeStep
					? "Enter the verification code sent to your email."
					: "Enter your email to receive a verification code."
			}
			requestCodeLabel="Send Verification Code"
			verifyCodeLabel="Verify & Continue"
			secondaryHref="/sign-up"
			secondaryLabel="Need an account? Sign up"
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
