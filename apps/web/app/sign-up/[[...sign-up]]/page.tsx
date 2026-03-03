import { AuthForm } from "@/components/auth-form";

export default function SignUpPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background px-6 py-10">
			<AuthForm mode="sign-up" />
		</div>
	);
}
