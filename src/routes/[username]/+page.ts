/* 
    This code will run on both the server and the client,
    to run on the server, simply change it to +page.server.ts file.
    The main drawback of running on server is that when fetching data from a load function
    you can't use real time data
*/

import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import type { PageLoad } from './$types';
import { db } from '$lib/firebase';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    const collectionRef = collection(db, "users")
    const q = query(collectionRef, where("username", "==", params.username), limit(1));
    const snapshot = await getDocs(q);
    const exists = snapshot.docs[0]?.exists();
    const data = snapshot.docs[0]?.data();

    if (!exists) {
        throw error(404, "User not found");
    }

    if (!data.published) {
        throw error(403, `The profile of ${params.username} is not public.`);
    }

    return {
        username: data.username,
        photoURL: data.photoURL,
        bio: data.bio,
        links: data.links ?? [],
    };
}) satisfies PageLoad;