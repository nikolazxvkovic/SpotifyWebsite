<script>
  import { goto } from '$app/navigation';
  import { load } from './+page.js';
  import { redirect } from '@sveltejs/kit';

  export let data;
  let checkUpdate = false;
  let songName = data.name;
  let songPopularity = data.popularity;
  let songArtists = data.artistsInfo;
  let artistIdAndName;
  let rmArtistName;

  function goBack() {
    goto('/songs/');
  }

  function updateSong() {
    checkUpdate = !checkUpdate;
  }

  function pushArtist() {
    let space = artistIdAndName.indexOf(" ");
    const artist = {
      id: artistIdAndName.substring(0, space).trim(),
      name: artistIdAndName.substring(space).trim()
    }
    console.log(artist);
    songArtists.push(artist);
    artistIdAndName = '';
  }

  function pullArtist() {
    for(let i = 0; i < songArtists.length; i++){
      if ( songArtists[i].name === rmArtistName) {
        songArtists.splice(i, 1);
        i--;
      }
    }
  }

  async function doPut () {
    const res = await fetch('http://localhost:3000/songs/'+data.id, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: data.id,
        name: songName,
        popularity: songPopularity,
        artistsInfo: songArtists
      })
    })
    data.popularity = songPopularity;
    data.name = songName;
    data.artistsInfo = songArtists;
  }

  async function deleteSong() {
    const res = await fetch('http://localhost:3000/songs/'+data.id, {
      method: 'DELETE'
    })
    console.log(res.status);
  }
</script>

<h1>{data.name}</h1>
<p>Popularity: {data.popularity}</p>
<p>Release Date: {data.releaseDate.toString().slice(0,4)}</p>
<p>Artists:</p>
<ul>
  {#each data.artistsInfo as cat}
    <li>
      <a href='/artists/{cat.id}=id/summary'>{cat.name}</a>
    </li>
  {/each}
</ul><br/>
<button on:click={goBack}>Back to Songs</button>
<button on:click={updateSong}>Update Song</button>
<button on:click={deleteSong}>Delete Song</button>
{#if checkUpdate}
  <p>Name<input bind:value={songName}/></p>
  <p>Popularity<input bind:value={songPopularity}/></p>
  <p>Artists id and name <input bind:value={artistIdAndName}/><button on:click={pushArtist}>+</button></p>
  <p>Remove Artist provide name <input bind:value={rmArtistName}/><button on:click={pullArtist}>-</button></p>
  <button on:click={doPut}>Update</button>
  <button on:click={updateSong}>Cancel</button>
{/if}

