import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { authClient } from "@/lib/auth-client";

interface SessionUser {
	id?: string;
	email?: string;
	name?: string;
}

interface SessionContextValue {
	isLoading: boolean;
	user: SessionUser | null;
	setUser: (user: SessionUser | null) => void;
	refreshSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | null>(null);

const backendBaseUrl = process.env.EXPO_PUBLIC_BACKEND_URL ?? "http://localhost:3000";

export function SessionProvider({ children }: { children: React.ReactNode }) {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<SessionUser | null>(null);

	const refreshSession = useCallback(async () => {
		try {
			const response = await fetch(`${backendBaseUrl}/api/auth/get-session`, {
				credentials: "include",
			});
			if (!response.ok) {
				setUser(null);
				return;
			}

			const result = (await response.json()) as {
				user?: SessionUser;
			};
			setUser(result.user ?? null);
		} catch {
			setUser(null);
		}
	}, []);

	useEffect(() => {
		refreshSession()
			.catch(() => {
				setUser(null);
			})
			.finally(() => setIsLoading(false));
	}, [refreshSession]);

	const value = useMemo(
		() => ({
			isLoading,
			user,
			setUser,
			refreshSession,
		}),
		[isLoading, refreshSession, user],
	);

	return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useMobileSession() {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error("useMobileSession must be used inside SessionProvider.");
	}
	return context;
}
