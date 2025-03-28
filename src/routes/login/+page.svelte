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
    <div class="card">
        <h2 class="card-title">Welcome, {$user?.displayName}!</h2>
        <p class="text-center text-success">You are successfully logged in.</p>
        <button class="btn btn-primary" on:click={handleSignOut}
            >Sign Out</button
        >
    </div>
</AuthCheck>
