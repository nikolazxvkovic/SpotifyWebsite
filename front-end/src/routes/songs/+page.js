import { limitQuery, nameQuery, offsetQuery, orderBy, orderDir, yearQuery } from './queries.js';
import { dataSongs } from './dataSongs.js';

export async function load({ fetch }) {
  let searchQuery = '';
  nameQuery.subscribe(value => {
    if(value !== '') {
      searchQuery = '?name=' + value;
    }
  })
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

  console.log("query: " + searchQuery);

  const res = await fetch(`http://localhost:3000/songs`+searchQuery,{
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  });
  const items = await res.json();
  dataSongs.set(items);

  return {
    songs: items
  };
}