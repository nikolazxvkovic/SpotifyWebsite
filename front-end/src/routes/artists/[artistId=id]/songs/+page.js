import { dataSongs } from '../../../songs/dataSongs.js';
import { limitQuery, offsetQuery, orderBy, orderDir, yearQuery } from '../../queries';
import { parameters } from '../../dataArtists.js';

export async function load({ fetch, params }) {
  let searchQuery = '';

  yearQuery.subscribe(value => {
    if(value !== '') {
      if(searchQuery !== '') {
        searchQuery += '&year=' + value;
      } else {
        searchQuery = '?year=' + value;
      }
    }
  })
  limitQuery.subscribe(limit => {
    let offset;
    offsetQuery.subscribe(value => {
      offset = value;
    })
    if(searchQuery !== '') {
      searchQuery += '&limit=' + limit;
    } else {
      searchQuery = '?limit=' + limit;
    }
    searchQuery += '&offset=' + offset;
  })
  orderDir.subscribe(direction => {
    let by;
    orderBy.subscribe(value => {
      by = value;
    })
    if(searchQuery !== '') {
      searchQuery += '&orderDir=' + direction;
    } else {
      searchQuery = '?orderDir=' + direction;
    }
    searchQuery += '&orderBy=' + by;
  })

  if(params !== undefined) {
    parameters.set(params.artistId);
  }

  let parame;
  parameters.subscribe(value => {
    parame = value;
  })

  console.log("query: " + searchQuery);
  const res = await fetch(`http://localhost:3000/artists/${parame}/songs`+searchQuery,{
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });
  const item = await res.json();
  console.log(item);

  dataSongs.set(item);

  return {
    list: item
  };
}