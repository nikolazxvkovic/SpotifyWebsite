<script>
  import { goto } from '$app/navigation';
  import { nameQuery } from '../../queries.js';
  import { parameters } from '../../dataArtists.js';
  export let data;
  let list = data.list[0];
  function goToArtistSongs() {
    parameters.set(list[5]);
    goto('/artists/'+list[5]+'=id/songs');
  }
  function goBack() {
    nameQuery.set('');
    goto('/artists/');
  }
</script>
<h1>{list[0].name}</h1>
<p> Number of Songs: {list[1]}</p>
{#if list[2] == null}
  <p>No songs :P</p>
{:else }
  <p> Earliest Song: {list[2].name}</p>
  <p> Latest Song: {list[3].name}</p>
  <p> Most Popular Song: {list[4].name}</p>
{/if}
<button on:click={goToArtistSongs}>Artist's Songs</button>
<button on:click={goBack}>Back to Artists</button>