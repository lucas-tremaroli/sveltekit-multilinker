<script lang="ts">
    // login logic should be ideally implemented outside of the component, such as in lib directory
    import { auth, user } from "$lib/firebase";
    import {
        GoogleAuthProvider,
        signInWithPopup,
        signOut,
    } from "firebase/auth";

    // this only issues a JWT token for the frontend, not a session cookie
    // if you want to use session cookies, you need to implement a server-side cookie based authentication
    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }
</script>

<h1>Login</h1>

<!--subscribing to the user store by adding a $ in front of it-->
{#if $user}
    <h2 class="card-title">Welcome, {$user.displayName}</h2>
    <p class="text-center text-success">You are logged in</p>
    <button class="btn" on:click={() => signOut(auth)}>Sign out</button>
{:else}
    <p>Please sign in to continue</p>
    <button class="btn" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}
