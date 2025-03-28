<script lang="ts">
    import { page } from "$app/stores";
</script>

<nav class="flex justify-center my-6">
    <ul class="steps">
        <a href="/login" class="step step-primary">Sign in</a>
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
            Photo
        </a>
    </ul>
</nav>
