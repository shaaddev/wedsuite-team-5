import { auth } from "@websuite/backend/lib/auth";

const handler = auth.handler;
export { handler as GET, handler as POST };
