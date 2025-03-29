import type { PageServerLoad, Actions } from "./$types";
import { adminAuth, adminDB } from "$lib/server/admin";
import { error, fail, redirect } from "@sveltejs/kit";

export const load = (async ({ locals, params }) => {
  const uid = locals.userId;
  if (!uid) {
    throw redirect(301, "/login");
  }
  const userDoc = await adminDB.collection("users").doc(uid).get();
  const { username, bio } = userDoc.data()!;

  if (params.username !== username) {
    throw error(401, "Unauthorized");
  }

  return {
    bio,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ locals, request, params }) => {
    const uid = locals.userId;
    const data = await request.formData();
    const bio = data.get("bio");
    const userRef = adminDB.collection("users").doc(uid!);
    const { username } = (await userRef.get()).data()!;
    if (params.username !== username) {
      throw error(401, "Unauthorized");
    }
    if (bio!.length > 160) {
      return fail(400, { problem: "Bio must be less than 260 characters" });
    }
    await userRef.update({
      bio,
    });
  },
} satisfies Actions;
