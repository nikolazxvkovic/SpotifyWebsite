<script>
  import { dataSongs } from '../../../songs/dataSongs.js';
  import Table from '../../../songs/songsTable.svelte';
  import { limitQuery, offsetQuery, orderBy, orderDir, yearQuery } from '../../queries';
  import { load } from './+page.js';
  import { parameters } from '../../dataArtists.js';

  let year = '';
  let batch = 10;
  let page = 0;
  let changedPage = false;
  let nextDirection = 'asc';
  let by = 'popularity';

  async function search() {
    yearQuery.set(year);
    limitQuery.set(batch);
    if(!changedPage) {
      page = 0;
    }
    offsetQuery.set(page * batch);
    orderBy.set(by.trim().replace(" ", "").toLowerCase());
    await load({ fetch });
    changedPage = false;
  }

  async function nextPage() {
    page++;
    changedPage = true;
    await search();
  }

  async function previousPage() {
    if(page !== 0) {
      page--;
      changedPage = true;
    }
    await search();
  }

  async function changeDirection() {
    orderDir.set(nextDirection);
    if (nextDirection === 'asc') {
      nextDirection = 'desc';
    } else {
      nextDirection = 'asc';
    }
    await search();
  }

  async function deleteSongs() {
    let artistName;
    parameters.subscribe(value => {
      artistName = value;
    })
    const res = await fetch(`http://localhost:3000/artists/${artistName}/songs`, {
      method: 'DELETE'
    })
    dataSongs.set([]);
    console.log(res.status);
  }

</script>

<h1>Artist's Songs</h1>
<button on:click={search}>Refresh</button>
<p>Filter options
  <input bind:value={year} placeholder="Year"/>
  <input bind:value={batch}/>
  <button on:click={previousPage}>Previous Page</button>
  <button on:click={nextPage}>Next Page</button>
  <button on:click={changeDirection}>{nextDirection}</button>
  <input bind:value={by}>
</p>
{#if $dataSongs.length !== 0}
  <Table tableData={$dataSongs}/>
{:else }
  <h2>No songs lol</h2>
{/if}
<button on:click={deleteSongs}>Delete Songs</button>

