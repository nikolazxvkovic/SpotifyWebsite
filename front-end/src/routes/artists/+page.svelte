<script>
  import { load } from './+page.js';
  import { dataArtists, renderTable } from './dataArtists.js';
  import { nameQuery } from './queries.js';
  import Table from './artistsTable.svelte';

  let data;
  let quer = '';
  let renderT = false;

  async function search() {
    nameQuery.set(quer);
    await load({ fetch });
    dataArtists.subscribe(value => {
      data = value;
    })
    renderTable.subscribe(value => {
      renderT = value;
    })
  }
</script>

<h1>Artists Page</h1>
<input bind:value={quer} placeholder="Search..."/>
<button on:click={search}>Search</button><br/>
{#if renderT}
  <h2>Please select an artist from the below list.</h2>
  <Table tabledata={$dataArtists}/>
{/if}