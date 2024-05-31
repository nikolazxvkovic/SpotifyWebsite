<script>
  import Table from './songsTable.svelte';
  import { limitQuery, nameQuery, offsetQuery, orderBy, orderDir, yearQuery } from './queries.js';
  import { load } from './+page.js';
  import { dataSongs } from './dataSongs.js';

  let quer = '';
  let year = '';
  let batch = 10;
  let page = 0;
  let changedPage = false;
  let nextDirection = 'asc';
  let by = 'popularity';
  let createCheck = false;

  async function search() {
    if(quer === '') {
      dataSongs.set([]);
      return;
    }
    nameQuery.set(quer);
    yearQuery.set(year);
    if(batch > 100) {
      batch = 100;
    }
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

  let createSongId = '';
  let createSongName = '';
  let createSongPopularity = 0;
  let createSongReleaseDate = '';
  let createSongArtists = [];
  let artistIdAndName = '';

  function pushArtist() {
    let space = artistIdAndName.indexOf(" ");
    const artist = {
      id: artistIdAndName.substring(0, space).trim(),
      name: artistIdAndName.substring(space).trim()
    }
    console.log(artist);
    createSongArtists.push(artist);
    artistIdAndName = '';
  }

  function setCreate(){
    createCheck = !createCheck;
  }

  async function doPost () {
    const res = await fetch('http://localhost:3000/songs', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: createSongId,
        name: createSongName,
        popularity: createSongPopularity,
        releaseDate: createSongReleaseDate,
        artistsInfo: createSongArtists
      })
    })
    const json = await res.json()
    console.log(json);
  }


</script>

<!--<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">-->

<h1>Songs page</h1>

<input bind:value={quer} placeholder="Search..."/>
<button on:click={search}>Butt</button><br/>
<p>Filter options
  <input bind:value={year} placeholder="Year"/>
  <input bind:value={batch}/>
  <button on:click={previousPage}>Previous Page</button>
  <button on:click={nextPage}>Next Page</button>
  <button on:click={changeDirection}>{nextDirection}</button>
  <input bind:value={by}><!--maybe replace with dropdown button :) no-->
</p>
{#if $dataSongs.length === 0}
  <h2>No songs lol</h2>
{:else }
  <Table tableData={$dataSongs}/>
  <button on:click={setCreate}>Create Song</button>
  {#if createCheck}
    <p>Id <input bind:value={createSongId}/></p>
    <p>Name <input bind:value={createSongName}/></p>
    <p>Popularity <input bind:value={createSongPopularity}/></p>
    <p>Release Date <input bind:value={createSongReleaseDate}/></p>
    <p>Artists id and name <input bind:value={artistIdAndName}/> <button on:click={pushArtist}>+</button></p>
    <button on:click={doPost}>Create</button>
    <button on:click={setCreate}>Cancel</button>
  {/if}
{/if}

<!--to remember: you cannot pass any params to a function when it is an event-->
