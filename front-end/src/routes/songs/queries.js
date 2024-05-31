import { writable } from 'svelte/store';

export const nameQuery = writable('');
export const yearQuery = writable('');
export const limitQuery = writable(10);
export const offsetQuery = writable(0);
export const orderDir = writable('desc');
export const orderBy = writable('popularity');