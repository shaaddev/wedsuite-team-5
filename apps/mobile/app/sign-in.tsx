import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { AuthForm } from "@/components/auth-forms";
import { authClient } from "@/lib/auth-client";

export default function SignInScreen() {
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
			const response = await authClient.signIn.email({
				email,
				password,
			});
			if (response.error) {
				setErrorMessage(response.error.message ?? "Unable to sign in.");
				return;
			}
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
