<script>
    import Icon from "@iconify/svelte";
    export let icon = "default";
    export let url = "foo";
    export let title = "bar";
</script>

<a
    href={url}
    class="stack w-full max-w-md text-center bg-base-300 flex justify-center items-center p-4 rounded-lf not-prose no-underline"
>
    <Icon icon="mdi:{icon}" width="24" />
    <span class="text-lg text-white font-bold">{title}</span>
</a>
