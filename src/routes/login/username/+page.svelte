<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { db, user } from "$lib/firebase";
    import { doc, getDoc, writeBatch } from "firebase/firestore";

    let username = "";
    let loading = false;
    let isAvailable = false;

    let debounceTimer: NodeJS.Timeout;

    async function checkAvailability() {
        isAvailable = false;
        clearTimeout(debounceTimer);

        loading = true;

        // Debounce the check to avoid making too many requests
        debounceTimer = setTimeout(async () => {
            console.log("Checking availability for", username);
            const docRef = doc(db, "usernames", username);
            const docSnap = await getDoc(docRef).then((doc) => doc.exists());
            isAvailable = !docSnap;
            loading = false;
        }, 500);
    }

    async function saveUsername() {
        // TODO: Save username to user document
        console.log("Saving username", username);
        const batch = writeBatch(db);
        // Atomic write to both collections using a batch
        batch.set(doc(db, "usernames", username), { uid: $user?.uid });
        batch.set(doc(db, "users", $user!.uid), {
            username,
            photoURL: $user?.photoURL ?? null,
            published: true,
            bio: "",
            links: [
                {
                    title: "Test",
                    url: "https://kung.foo",
                    icon: "🔗",
                },
            ],
        });
        await batch.commit();
        username = "";
        isAvailable = false;
    }
</script>

<AuthCheck>
    <h1>Username</h1>
    <form on:submit|preventDefault={saveUsername}>
        <input type="text" bind:value={username} on:input={checkAvailability} />
        <p>Is available: {isAvailable}</p>
        <button class="btn btn-success" disabled={!isAvailable || loading}
            >Save</button
        >
    </form>
</AuthCheck>
