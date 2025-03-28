<script lang="ts">
    // Allow us to get information about the current route
    import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
    import StepNavigation from "$lib/components/StepNavigation.svelte";
</script>

<div class="items-center justify-center min-h-screen flex flex-col">
    <StepNavigation />
    <AnimatedRoute>
        <main>
            <div class="card-body items-center text-center">
                <!--All child pages will be rendered inside of this card thanks to the slot tag-->
                <slot />
            </div>
        </main>
    </AnimatedRoute>
</div>
