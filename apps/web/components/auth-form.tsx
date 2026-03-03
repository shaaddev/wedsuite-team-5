"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

type AuthMode = "sign-in" | "sign-up";

interface AuthFormProps {
	mode: AuthMode;
}

export function AuthForm({ mode }: AuthFormProps) {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isPending, setIsPending] = useState(false);

	const isSignIn = mode === "sign-in";

	const onSubmit = async () => {
		if (!email.trim() || !password.trim()) {
			setErrorMessage("Please enter both email and password.");
			return;
		}

		setErrorMessage("");
		setIsPending(true);

		try {
			const response = isSignIn
				? await authClient.signIn.email({
						email: email.trim(),
						password,
					})
				: await authClient.signUp.email({
						email: email.trim(),
						password,
						name: email.split("@")[0] ?? "WedSuite User",
					});

			if (response.error) {
				setErrorMessage(response.error.message ?? "Authentication failed.");
				return;
			}

			router.replace("/onboarding");
			router.refresh();
		} catch {
			setErrorMessage("Authentication failed. Please try again.");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<Card className="w-full max-w-md rounded-2xl border-border/60 shadow-sm">
			<CardHeader>
				<CardTitle>{isSignIn ? "Sign In" : "Create Account"}</CardTitle>
				<p className="text-muted-foreground text-sm">
					{isSignIn
						? "Sign in to continue planning your wedding."
						: "Register to start your wedding planning dashboard."}
				</p>
			</CardHeader>
			<CardContent className="space-y-5">
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						onChange={(event) => setEmail(event.target.value)}
						placeholder="johndoe@email.com"
						type="email"
						value={email}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						onChange={(event) => setPassword(event.target.value)}
						placeholder="Password"
						type="password"
						value={password}
					/>
				</div>

				{errorMessage ? (
					<p className="text-destructive text-sm">{errorMessage}</p>
				) : null}

				<Button
					className="w-full rounded-full text-xs uppercase tracking-widest"
					disabled={isPending}
					onClick={onSubmit}
				>
					{isPending
						? "Please wait..."
						: isSignIn
							? "Sign In"
							: "Create Account"}
				</Button>

				<p className="text-center text-muted-foreground text-sm">
					{isSignIn ? "No account yet?" : "Already have an account?"}{" "}
					<Link
						className="font-medium text-foreground underline-offset-4 hover:underline"
						href={isSignIn ? "/sign-up" : "/sign-in"}
					>
						{isSignIn ? "Sign up" : "Sign in"}
					</Link>
				</p>
			</CardContent>
		</Card>
	);
}
