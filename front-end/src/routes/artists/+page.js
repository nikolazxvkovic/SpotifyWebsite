import { dataArtists, renderTable } from './dataArtists.js';
import { nameQuery } from './queries.js';
import { goto } from '$app/navigation';

export async function load({ fetch }) {
  let searchQuery;
  nameQuery.subscribe(value => {
    searchQuery = value;
  })
  console.log("query: "+searchQuery);

  if(searchQuery === '') {
    return {};
  }
  const res = await fetch(`http://localhost:3000/artists/`+searchQuery+'=name/summary',{
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });
  let items = await res.json();
  console.log(items);
  dataArtists.set(items[0]);

  if(items[0][1] !== undefined) {
    if((typeof items[0][1]).toString() === 'number') {
      console.log('redirecting...' + '/'+searchQuery+'=name/summary');
      goto('/artists/'+searchQuery+'=name/summary');
    } else {
      renderTable.set(true);
    }
  }

  return {
    artists: items
  };
}