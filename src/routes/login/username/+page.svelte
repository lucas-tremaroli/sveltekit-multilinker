<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { db, user, userData } from "$lib/firebase";
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
            const docSnap = await getDoc(docRef);
            isAvailable = !docSnap.exists();
            loading = false;
        }, 500);
    }

    async function saveUsername() {
        if (!isAvailable || loading) return;
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

    const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Reactive statements to determine the validity and touched state of the username
    $: isValid =
        username?.length > 2 && username.length < 16 && re.test(username);
    $: isTouched = username.length > 0;
    $: isTaken = isValid && !isAvailable && !loading;
</script>

<AuthCheck>
    {#if $userData?.username}
        <div class="card bg-base-200">
            <div class="card-body space-y-2">
                <h2 class="card-title">Username</h2>
                <p>
                    Your username is <b class="text-success"
                        >@{$userData.username}</b
                    >
                </p>
            </div>
        </div>
    {:else}
        <form on:submit|preventDefault={saveUsername}>
            <input
                type="text"
                placeholder="Username"
                class="input w-full"
                bind:value={username}
                on:input={checkAvailability}
                class:input-error={!isValid && isTouched}
                class:input-warning={isTaken && !loading}
                class:input-success={isAvailable && isValid && !loading}
            />
            <div class="my-4 min-h-16 px-8 w-full">
                {#if loading && isTouched}
                    <p class="text-secondary">
                        Checking availability of @{username}...
                    </p>
                {:else if isTouched && !isValid}
                    <p class="text-red-500">
                        Username must be 3-16 characters long<br />and contain
                        only alphanumeric characters.
                    </p>
                {:else if !isTouched}
                    <p class="text-secondary">Choose a username</p>
                {:else if isTaken}
                    <p class="text-red-500">Username is already taken</p>
                {:else if isAvailable && isValid}
                    <p class="text-green-500">Username is available</p>
                    <button
                        class="btn btn-success"
                        disabled={!isAvailable || loading}>Save</button
                    >
                {/if}
            </div>
        </form>
    {/if}
</AuthCheck>
