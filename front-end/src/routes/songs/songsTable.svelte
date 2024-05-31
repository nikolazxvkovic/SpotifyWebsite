<script>
  import { dataSongs } from './dataSongs.js';
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
    <th>NAME</th>
    <th>POPULARITY</th>
    <th>RELEASE DATE</th>
    <th>ARTISTS</th>
  <tr/>
  </thead>
  <tbody>
  {#each Object.values(tableData) as row}
    <tr>
      <td><a href='/songs/{row.id}'> {row.name} </a></td>
      <td>{row.popularity}</td>
      <td>{row.releaseDate.toString().slice(0,4)}</td>
      <td>{#each row.artistsInfo as artist}
        <a href='/artists/{artist.id}=id/summary'> {artist.name + "    "}</a>
      {/each}</td>
    </tr>
  {/each}
  </tbody>
</table>
