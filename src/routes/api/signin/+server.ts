import { adminAuth } from "$lib/server/admin";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
  // idToken is provided by google sign in
  const { idToken } = await request.json();
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  // uses admin sdk to decode the idToken in the firebase server
  const decodedIdToken = await adminAuth.verifyIdToken(idToken);
  // checks if the token is not expired
  if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
    // Cookies are small pieces of data stored on the client-side and sent to the server with each request.
    // They are used to maintain session state and track user information across different pages.
    // In this case, we are creating a session cookie to keep the user logged in for a specified duration.
    const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      // is important to set the path to root, because by default it is set to the path where the request was made
      path: "/",
    };
    // firebase requires the cookie to be named "__session"
    cookies.set("__session", cookie, {
      ...options,
      sameSite: "strict",
    });
    return json({ message: "Session cookie created" });
  } else {
    throw error(401, "Token expired");
  }
};

export const DELETE: RequestHandler = async ({ cookies }) => {
  cookies.delete("__session", { path: "/" });
  return json({ message: "Session cookie deleted" });
};
