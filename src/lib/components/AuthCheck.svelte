<script lang="ts">
    import { user } from "$lib/firebase";
</script>

{#if $user}
    <!-- slot is a placeholder for content that will be provided when the component is used. -->
    <slot />
{:else}
    <p>Please sign in to continue</p>
    <button class="btn" on:click={() => (location.href = "/login")}
        >Sign in</button
    >
{/if}
