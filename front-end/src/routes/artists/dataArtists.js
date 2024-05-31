import { writable } from 'svelte/store';

export const dataArtists = writable([]);
export const renderTable = writable(false);
export const parameters = writable('');
