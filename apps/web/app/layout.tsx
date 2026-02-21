import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-dm-sans",
});

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-cormorant",
});

export const metadata: Metadata = {
	title: "WedSuite | Curated Wedding Vendors",
	description:
		"Discover and book exceptional wedding vendors. Browse photographers, florists, venues, caterers, and more for your perfect celebration.",
};

export const viewport: Viewport = {
	themeColor: "#5E7D60",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
			<body className="font-sans antialiased">
				{children}
				<Analytics />
			</body>
		</html>
	);
}
