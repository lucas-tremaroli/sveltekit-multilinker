<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { user, userData, storage, db } from "$lib/firebase";
    import { doc, updateDoc } from "firebase/firestore";
    import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

    let previewURL: string;
    let uploading = false;
    $: href = `/${$userData?.username}/edit`;

    async function uploadPhoto(e: any) {
        uploading = true;
        const file = e.target.files[0];
        previewURL = URL.createObjectURL(file);
        const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
        const result = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc(db, "users", $user!.uid), {
            photoURL: url,
        });
        uploading = false;
    }
</script>

<AuthCheck>
    <div class="card bg-base-200">
        <div class="card-body space-y-2">
            <h2 class="card-title">Profile Pic</h2>
            <p>Upload or change your profile picture.</p>
            <form>
                <div class="form-control space-y-2">
                    <div class="avatar">
                        <div class="mx-auto w-48 h-48">
                            <img
                                src={previewURL ??
                                    $userData?.photoURL ??
                                    "/user.png"}
                                alt="photoURL"
                            />
                        </div>
                    </div>
                    {#if uploading}
                        <div class="flex flex-col items-center">
                            <p>Uploading...</p>
                            <progress
                                class="progress progress-info w-56 mt-2"
                            />
                        </div>
                    {:else}
                        <input
                            on:change={uploadPhoto}
                            name="photoURL"
                            type="file"
                            class="file-input file-input-bordered"
                            accept="image/*"
                        />
                    {/if}
                </div>
            </form>
            <div class="card-actions">
                <a {href} class="btn btn-primary btn-block">Finish</a>
            </div>
        </div>
    </div>
</AuthCheck>
