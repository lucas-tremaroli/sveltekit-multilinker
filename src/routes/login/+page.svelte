<script lang="ts">
    import { auth, user } from "$lib/firebase";
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { signOut } from "firebase/auth";

    async function signOutSSR() {
        const res = await fetch("/api/signin", { method: "DELETE" });
        await signOut(auth);
    }
</script>

<AuthCheck>
    <div class="card bg-base-200">
        <div class="card-body space-y-2">
            <h2 class="card-title">Welcome, {$user?.displayName}!</h2>
            <p class="text-success">You are successfully logged in.</p>
            <div class="card-actions">
                <button class="btn btn-primary btn-block" on:click={signOutSSR}
                    >Sign Out</button
                >
            </div>
        </div>
    </div>
</AuthCheck>
