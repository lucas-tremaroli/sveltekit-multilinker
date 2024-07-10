<script>
    import { page } from "$app/stores";
    import { fly } from "svelte/transition";
</script>

<!--svelte key mechanism rebuilds all children whenever the value on the right side changes-->
{#key $page.url}
    <div in:fly={{ x: "-100%", duration: 500 }}>
        <slot />
    </div>
{/key}
