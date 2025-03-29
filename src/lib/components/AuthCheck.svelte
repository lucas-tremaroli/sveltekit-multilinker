<script lang="ts">
    import { auth, user } from "$lib/firebase";
    import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

    async function signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const credential = await signInWithPopup(auth, provider);
            const idToken = await credential.user.getIdToken();
            const response = await fetch("/api/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
                },
                body: JSON.stringify({ idToken }),
            });
            if (response.ok) {
                console.log("Sign-in successful", response);
            } else {
                console.error("Sign-in failed");
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    }
</script>

{#if $user}
    <!-- slot is a placeholder for content that will be provided when the component is used. -->
    <slot />
{:else}
    <div class="card bg-base-300">
        <div class="card-body space-y-2">
            <h2 class="card-title">403 Forbidden</h2>
            <p>Please sign in to continue</p>
            <div class="card-actions">
                <button class="btn btn-primary" on:click={signInWithGoogle}
                    >Sign in</button
                >
            </div>
        </div>
    </div>
{/if}
