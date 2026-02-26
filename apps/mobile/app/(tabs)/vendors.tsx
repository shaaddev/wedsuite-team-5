import { RequireAuth } from "@/components/require-auth";
import { VendorsScreen } from "@/components/vendors-screen";

export default function VendorsTab() {
	return (
		<RequireAuth>
			<VendorsScreen />
		</RequireAuth>
	);
}
