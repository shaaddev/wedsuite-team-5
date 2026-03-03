import { auth } from "@websuite/backend/lib/auth";
import { headers } from "next/headers";

export async function getServerSession() {
	return auth.api.getSession({
		headers: await headers(),
	});
}
