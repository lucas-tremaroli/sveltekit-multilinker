<script lang="ts">
    import { page } from "$app/stores";
    import UserLink from "$lib/components/UserLink.svelte";
    import SortableList from "$lib/components/SortableList.svelte";
    import { db, userData, user } from "$lib/firebase";
    import {
        arrayRemove,
        arrayUnion,
        doc,
        setDoc,
        updateDoc,
    } from "firebase/firestore";
    import { writable } from "svelte/store";

    const icons = [
        "Twitter",
        "GitHub",
        "LinkedIn",
        "Instagram",
        "YouTube",
        "Twitch",
        "TikTok",
        "Custom",
    ];

    const formDefaults = {
        icon: "custom",
        title: "",
        url: "https://",
    };

    const formData = writable(formDefaults);

    let showForm = false;

    $: urlIsValid =
        /^(ftp|http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/.test(
            $formData.url,
        );
    $: titleIsValid = $formData.title.length > 0 && $formData.title.length < 20;
    $: formIsValid = urlIsValid && titleIsValid;

    async function addLink(e: SubmitEvent) {
        const userRef = doc(db, "users", $user!.uid);
        await updateDoc(userRef, {
            links: arrayUnion({
                ...$formData,
                id: Date.now().toString(),
            }),
        });
        formData.set(formDefaults);
        showForm = false;
    }

    function sortList(e: CustomEvent) {
        const newList = e.detail;
        const userRef = doc(db, "users", $user!.uid);
        setDoc(userRef, { links: newList }, { merge: true });
    }

    async function deleteLink(item: any) {
        const userRef = doc(db, "users", $user!.uid);
        await updateDoc(userRef, {
            links: arrayRemove(item),
        });
    }

    function cancelLink() {
        formData.set(formDefaults);
        showForm = false;
    }
</script>

<main class="max-w-xl mx-auto">
    {#if $userData?.username == $page.params.username}
        <h1 class="mx-2 text-2xl font-bold mt-8 mb-4 text-center">
            Edit your profile
        </h1>
        <SortableList
            list={$userData?.links}
            on:sort={sortList}
            let:item
            let:index
        >
            <div class="group relative">
                <UserLink {...item} />
                <button
                    on:click={() => deleteLink(item)}
                    class="btn btn-xs btn-error invisible group-hover:visible transition-all absolute -right-6 bottom-10"
                    >Delete</button
                >
            </div>
        </SortableList>
        {#if showForm}
            <form on:submit|preventDefault={addLink}>
                <fieldset class="fieldset bg-base-200 p-6 space-y-2">
                    <legend class="text-center">Add a Link</legend>
                    <legend class="fieldset-legend form-control">Icon</legend>
                    <select
                        name="icon"
                        class="select w-full"
                        bind:value={$formData.icon}
                    >
                        {#each icons as icon}
                            <option value={icon.toLowerCase()}>{icon}</option>
                        {/each}
                    </select>
                    <legend class="fieldset-legend form-control">Title</legend>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        class="input w-full"
                        bind:value={$formData.title}
                    />
                    <p class="fieldset-label text-error">
                        {#if !titleIsValid}
                            Title must be between 1 and 20 characters
                        {/if}
                    </p>
                    <legend class="fieldset-legend form-control">URL</legend>
                    <input
                        type="url"
                        placeholder="https://"
                        class="input w-full"
                        bind:value={$formData.url}
                    />
                    <p class="fieldset-label text-error">
                        {#if !urlIsValid}
                            URL must be valid
                        {/if}
                    </p>
                    <button
                        disabled={!formIsValid}
                        type="submit"
                        class="btn btn-success btn-block">Add Link</button
                    >
                    <button
                        type="button"
                        class="btn btn-error btn-block"
                        on:click={cancelLink}>Cancel</button
                    >
                </fieldset>
            </form>
        {:else}
            <button
                on:click={() => (showForm = true)}
                class="btn btn-outrline btn-info block mx-auto my-4"
            >
                Add a Link
            </button>
        {/if}
    {/if}
</main>
