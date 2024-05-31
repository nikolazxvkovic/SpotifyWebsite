<script>
  import { dataArtists } from './dataArtists.js';

  export let tableData = [
    {
      vitae : "dolorem",
      lectus : "ipsum",
      quisquam : "quia"
    },
    {
      vitae : "amet",
      lectus : "consectetur",
      quisquam : "adipisci"
    }
  ];

</script>

<table>
  <thead>
  <tr>
    <th>ID</th>
    <th>NAME</th>
    <th>POPULARITY</th>
  <tr/>
  </thead>
  <tbody>

    {#each Object.values($dataArtists) as artist}
    <tr>
      <td><a href='/artists/{artist.id}=id/summary'> {artist.id} </a></td>
      <td>{artist.name}</td>
      <td>{Math.ceil(artist.average)}</td>
    </tr>
    {/each}
  </tbody>
</table>