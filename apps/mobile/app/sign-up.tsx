import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { AuthForm } from "@/components/auth-forms";
import { authClient } from "@/lib/auth-client";

export default function SignUpScreen() {
	const router = useRouter();
	const { data: session, isPending: sessionPending } = authClient.useSession();
	const [isPending, setIsPending] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (sessionPending) {
			return;
		}
		if (session?.user) {
			router.replace("/onboarding");
		}
	}, [router, session?.user, sessionPending]);

	const onSubmit = async (email: string, password: string) => {
		if (!email || !password) {
			setErrorMessage("Please enter both email and password.");
			return;
		}

		setErrorMessage("");
		setIsPending(true);

		try {
			const response = await authClient.signUp.email({
				email,
				password,
				name: email.split("@")[0] ?? "WedSuite User",
			});
			if (response.error) {
				setErrorMessage(response.error.message ?? "Unable to sign up.");
				return;
			}
			router.replace("/onboarding");
		} catch {
			setErrorMessage("Unable to sign up. Please try again.");
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
