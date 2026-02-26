import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-6 py-10">
			<SignIn
				appearance={{
					elements: {
						card: "shadow-sm",
					},
				}}
				signUpUrl="/sign-up"
				fallbackRedirectUrl="/onboarding"
			/>
		</div>
	);
}
