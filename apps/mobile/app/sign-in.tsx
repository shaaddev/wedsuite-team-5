import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { AuthForm } from "@/components/auth-forms";
import { authClient } from "@/lib/auth-client";
import { useMobileSession } from "@/lib/session-context";

export default function SignInScreen() {
	const router = useRouter();
	const { isLoading, refreshSession, setUser, user } = useMobileSession();
	const [isPending, setIsPending] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (isLoading) {
			return;
		}
		if (user) {
			router.replace("/onboarding");
		}
	}, [isLoading, router, user]);

	const onSubmit = async (email: string, password: string) => {
		if (!email || !password) {
			setErrorMessage("Please enter both email and password.");
			return;
		}

		setErrorMessage("");
		setIsPending(true);

		try {
			const response = await authClient.signIn.email({
				email,
				password,
			});
			if (response.error) {
				setErrorMessage(response.error.message ?? "Unable to sign in.");
				return;
			}
			setUser({
				email,
			});
			await refreshSession();
			router.replace("/onboarding");
		} catch {
			setErrorMessage("Unable to sign in. Please try again.");
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
