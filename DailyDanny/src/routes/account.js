import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store'

export const currentArticle = writable(null);
export const account = persisted('account', null);
export const isAdmin = persisted('isAdmin', false);
export const isEditor = persisted('isEditor', false);
export const isUser = persisted('isUser', false);


