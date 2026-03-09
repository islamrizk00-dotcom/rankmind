import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export function withAuth(handler) {
  return async function (req, res) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized — please sign in" });
    }

    if (session.error === "RefreshTokenError") {
      return res.status(401).json({ error: "Session expired — please sign in again" });
    }

    req.session = session;
    req.accessToken = session.accessToken;

    return handler(req, res);
  };
}
