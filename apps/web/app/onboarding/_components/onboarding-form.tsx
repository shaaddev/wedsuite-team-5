"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/data";
import type { UserRole } from "@/lib/onboarding";

interface OnboardingFormProps {
	initialRole: UserRole | null;
}

interface CoupleFormState {
	partnerOneName: string;
	partnerTwoName: string;
	weddingDate: string;
	location: string;
}

interface VendorFormState {
	businessName: string;
	category: string;
	location: string;
	startingPrice: string;
}

const initialCoupleForm: CoupleFormState = {
	partnerOneName: "",
	partnerTwoName: "",
	weddingDate: "",
	location: "",
};

const initialVendorForm: VendorFormState = {
	businessName: "",
	category: "",
	location: "",
	startingPrice: "",
};

export function OnboardingForm({ initialRole }: OnboardingFormProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [role, setRole] = useState<UserRole | null>(initialRole);
	const [errorMessage, setErrorMessage] = useState("");
	const [coupleForm, setCoupleForm] =
		useState<CoupleFormState>(initialCoupleForm);
	const [vendorForm, setVendorForm] =
		useState<VendorFormState>(initialVendorForm);

	const roleCopy = useMemo(
		() =>
			role === "vendor"
				? "Tell us about your wedding business."
				: "Share your wedding details so we can personalize your dashboard.",
		[role],
	);

	const updateCoupleField = useCallback(
		(field: keyof CoupleFormState, value: string) => {
			setCoupleForm((previous) => ({ ...previous, [field]: value }));
		},
		[],
	);

	const updateVendorField = useCallback(
		(field: keyof VendorFormState, value: string) => {
			setVendorForm((previous) => ({ ...previous, [field]: value }));
		},
		[],
	);

	const submitOnboarding = useCallback(() => {
		if (!role) {
			setErrorMessage("Please select your role to continue.");
			return;
		}

		setErrorMessage("");
		const payload = {
			role,
			data: role === "vendor" ? vendorForm : coupleForm,
		};

		startTransition(async () => {
			try {
				const response = await fetch("/api/onboarding", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				});

				if (!response.ok) {
					const result = (await response.json()) as { error?: string };
					setErrorMessage(result.error ?? "Unable to complete onboarding.");
					return;
				}

				router.push("/dashboard");
				router.refresh();
			} catch {
				setErrorMessage("Unable to complete onboarding. Please try again.");
			}
		});
	}, [coupleForm, role, router, vendorForm]);

	return (
		<Card className="w-full max-w-xl rounded-2xl border-border/60 shadow-sm">
			<CardHeader>
				<p className="font-medium text-muted-foreground text-xs uppercase tracking-[0.25em]">
					Welcome to WedSuite
				</p>
				<CardTitle className="mt-2 font-light font-serif text-3xl">
					Finish your onboarding
				</CardTitle>
				<p className="text-muted-foreground text-sm">
					Choose your account type and complete your profile.
				</p>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-3">
					<Label>I am a...</Label>
					<RadioGroup
						className="grid grid-cols-1 gap-3 sm:grid-cols-2"
						onValueChange={(value) => setRole(value as UserRole)}
						value={role ?? ""}
					>
						<Label
							className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/60 p-4"
							htmlFor="role-couple"
						>
							<RadioGroupItem id="role-couple" value="couple" />
							<span className="font-medium text-sm">Couple</span>
						</Label>
						<Label
							className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/60 p-4"
							htmlFor="role-vendor"
						>
							<RadioGroupItem id="role-vendor" value="vendor" />
							<span className="font-medium text-sm">Vendor</span>
						</Label>
					</RadioGroup>
				</div>

				{role && (
					<div className="space-y-4">
						<p className="text-muted-foreground text-sm">{roleCopy}</p>

						{role === "couple" ? (
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="partnerOneName">Partner One</Label>
									<Input
										id="partnerOneName"
										onChange={(event) =>
											updateCoupleField("partnerOneName", event.target.value)
										}
										placeholder="Avery"
										value={coupleForm.partnerOneName}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="partnerTwoName">Partner Two</Label>
									<Input
										id="partnerTwoName"
										onChange={(event) =>
											updateCoupleField("partnerTwoName", event.target.value)
										}
										placeholder="Jordan"
										value={coupleForm.partnerTwoName}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="weddingDate">Wedding Date</Label>
									<Input
										id="weddingDate"
										onChange={(event) =>
											updateCoupleField("weddingDate", event.target.value)
										}
										type="date"
										value={coupleForm.weddingDate}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="coupleLocation">Wedding Location</Label>
									<Input
										id="coupleLocation"
										onChange={(event) =>
											updateCoupleField("location", event.target.value)
										}
										placeholder="San Francisco, CA"
										value={coupleForm.location}
									/>
								</div>
							</div>
						) : (
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-2 sm:col-span-2">
									<Label htmlFor="businessName">Business Name</Label>
									<Input
										id="businessName"
										onChange={(event) =>
											updateVendorField("businessName", event.target.value)
										}
										placeholder="Golden Hour Studio"
										value={vendorForm.businessName}
									/>
								</div>
								<div className="space-y-2">
									<Label>Vendor Category</Label>
									<Select
										onValueChange={(value) =>
											updateVendorField("category", value)
										}
										value={vendorForm.category}
									>
										<SelectTrigger aria-label="Select vendor category">
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem key={category} value={category}>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="vendorLocation">Business Location</Label>
									<Input
										id="vendorLocation"
										onChange={(event) =>
											updateVendorField("location", event.target.value)
										}
										placeholder="San Francisco, CA"
										value={vendorForm.location}
									/>
								</div>
								<div className="space-y-2 sm:col-span-2">
									<Label htmlFor="startingPrice">Starting Price</Label>
									<Input
										id="startingPrice"
										onChange={(event) =>
											updateVendorField("startingPrice", event.target.value)
										}
										placeholder="$2,500"
										value={vendorForm.startingPrice}
									/>
								</div>
							</div>
						)}
					</div>
				)}

				{errorMessage ? (
					<p className="text-destructive text-sm">{errorMessage}</p>
				) : null}

				<Button
					className="w-full rounded-full text-xs uppercase tracking-widest"
					disabled={isPending}
					onClick={submitOnboarding}
				>
					{isPending ? "Saving..." : "Continue to dashboard"}
				</Button>
			</CardContent>
		</Card>
	);
}
