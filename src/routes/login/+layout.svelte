<script lang="ts">
    // Allow us to get information about the current route
    import { page } from "$app/stores";
    import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
</script>

<nav class="flex justify-center my-6">
    <ul class="steps">
        <a href="/login" class="step step-primary">Sign In</a>
        <a
            href="/login/username"
            class="step"
            class:step-primary={$page.route.id?.match(/username|photo/g)}
        >
            Choose Username
        </a>
        <a
            href="/login/photo"
            class="step"
            class:step-primary={$page.route.id?.includes("photo")}
        >
            Upload Photo
        </a>
    </ul>
</nav>

<AnimatedRoute>
    <main>
        <div class="card-body items-center text-center">
            <!--All child pages will be rendered inside of this card thanks to the slot tag-->
            <slot />
        </div>
    </main>
</AnimatedRoute>
