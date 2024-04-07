import { writable } from 'svelte/store';

export const account = writable(null);
export const isAdmin = writable(false);
export const isEditor = writable(false);
export const isUser = writable(false);