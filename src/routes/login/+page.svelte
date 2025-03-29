<script lang="ts">
    import { auth, user } from "$lib/firebase";
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { signOut } from "firebase/auth";

    async function handleSignOut() {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error during sign-out:", error);
        }
    }
</script>

<AuthCheck>
    <div class="card bg-base-300">
        <div class="card-body space-y-2">
            <h2 class="card-title">Welcome, {$user?.displayName}!</h2>
            <p class="text-success">You are successfully logged in.</p>
            <div class="card-actions">
                <button
                    class="btn btn-primary btn-block"
                    on:click={handleSignOut}>Sign Out</button
                >
            </div>
        </div>
    </div>
</AuthCheck>
