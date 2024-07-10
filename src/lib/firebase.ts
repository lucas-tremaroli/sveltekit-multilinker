import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

const firebaseConfig = {
    apiKey: "AIzaSyC1OE1dlO9UaEsn4qn1eBmttiNCvFdWHX8",
    authDomain: "fireship-svelte-fa8b1.firebaseapp.com",
    projectId: "fireship-svelte-fa8b1",
    storageBucket: "fireship-svelte-fa8b1.appspot.com",
    messagingSenderId: "1017890099220",
    appId: "1:1017890099220:web:55d3898c2bc14de6f6d701"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

function userStore() {
    let unsubscribe: () => void;

    
    // set the store to null if the firebase client is not available, like in SSR
    if (!auth || !globalThis.window) {
        console.warn('Firebase Auth not available');
        const { subscribe } = writable<User | null>(null);
        return { subscribe };
    }

    const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
        // method from firebase/auth
        unsubscribe = onAuthStateChanged(auth, (user) => {
            set(user);
        });

        // unsubscribe from the auth state change when the store is no longer used in the UI
        return () => unsubscribe();
    });

    return {
        subscribe
    };
}

// exporting the user store so we can use it in our entire application
export const user = userStore();